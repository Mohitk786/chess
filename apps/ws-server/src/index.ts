import { Server } from "socket.io";
import Redis from "ioredis";
import db from "@chess/db/client";
import { Chess } from "chess.js";
import { Queue } from "bullmq";

const redis = new Redis();
// Create a queue for storing moves
export const moveQueue = new Queue("moveQueue", { connection: redis });

const io = new Server(5000);
const gameSockets: {
  [gameId: string]: { playerId: string; socketId: string }[];
} = {};

io.on("connection", (socket) => {

  socket.on("join_game_by_id", async (gameId, playerId) => {
    if (!gameSockets[gameId]) {
      gameSockets[gameId] = [];
    }

    gameSockets[gameId].push({ playerId, socketId: socket.id });

    let fen = await redis.get(`game:${gameId}:fen`);
    if (!fen) {
      const game = await db.game.findUnique({
        where: {
          id: gameId,
        },
        include: {
          moves: true,
        },
      });

      if (!game) {
        return socket.emit("error", "Game not found!");
      }

      // It replays all the moves stored in the database. (gets the latest board position )
      const chess = new Chess();

      //resume the game from the last position (agar game pause kar diya tha to)
      game.moves.forEach((m) => chess.move(m.notation));
      fen = chess.fen();

      await redis.set(`game:${gameId}:fen`, fen);
    }

    socket.join(gameId);
    socket.emit("game_state", {
      gameId,
      fen,
    });
  });

  socket.on("move", async (gameId, move) => {
    try {
      const game = await db.game.findUnique({
        where: { id: gameId },
        include: {
          white: true,
          black: true,
          moves: true,
        },
      });

      if (!game) {
        return socket.emit("error", { message: "Game not found" });
      }

      let fen = await redis.get(`game:${gameId}:fen`);

      if (!fen)
        return socket.emit("error", {
          message: "Game board state is not available",
        });

      const chess = new Chess(fen);

      // Check if the move is valid using chess.js
      const validMove = chess.move(move.notation);
      if (!validMove) {
        return socket.emit("error", { message: "Invalid move" });
      }

      const currentPlayerColor =
        game.whiteId === move.playerId ? "white" : "black";
      const expectedTurn = chess.turn() === currentPlayerColor.charAt(0);

      if (!expectedTurn) {
        return socket.emit("error", {
          message: `It's ${currentPlayerColor === "white" ? "black" : "white"}'s turn`,
        });
      }

      // Apply the move and update the FEN
      chess.move(move.notation);
      fen = chess.fen();

        // Store the move in the database
      await db.game.update({
        where: { id: gameId },
        data: { fen: fen },
      });

      await moveQueue.add("storeMove", {
        gameId,
        playerId: move.playerId,
        moveNum: game.moves.length + 1,
        notation: move.notation,
      });

 
      const opponentSocket = getOpponentSocket(gameId, move.playerId); // Function to get opponent's socket ID
      if (opponentSocket) {
        opponentSocket.emit("opponent_move", {
          from: move.from,
          to: move.to,
          notation: move.notation,
        });
      }

      // Check if the game is over (win, draw, etc.)
      if (chess.isGameOver()) {
        const result = chess.isCheckmate() ? "WIN" : "DRAW"; 
        
        await db.game.update({
          where: { id: gameId },
          data: { result: result },
        });
        
        io.to(gameId).emit("game_over", { result });
        
      }
    } catch (error) {
      console.error("Error handling move:", error);
      socket.emit("error", {
        message: "An error occurred while processing the move",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  
});

function getOpponentSocket(gameId: string, playerId: string) {
  const players = gameSockets[gameId];
  if (!players) return null;

  const opponent = players.find((p) => p.playerId !== playerId); // Find the opponent

  if (!opponent) return null; 

  return io.sockets.sockets.get(opponent.socketId); // return socket instance of opponent
}

console.log("WebSocket server is running on ws://localhost:5000");
