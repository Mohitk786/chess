"use client";
import { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { io, Socket } from "socket.io-client";
import { Move, GameState } from "@/types/game";
import toast from "react-hot-toast";


interface ChessBoardProps {
  gameId: number;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ gameId }) => {
  const [game, setGame] = useState(new Chess());
  const [boardFen, setBoardFen] = useState<string>();
  const socketRef = useRef<Socket | null>(null);
  const [playerColor, setPlayerColor] = useState<"white" | "black">("white");

  useEffect(() => {
    
    const socket = io("ws://localhost:5000", {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to WebSocket");

      socket.emit("join_game_by_id", { gameId }, (data: any) => {
        if (data?.error) {
          toast.error(data.error);
          return;
        }
        setPlayerColor(data.assigndColorToPlayer);
        setBoardFen(data.fen);
      });
    });

    socket.on("player_joined", (data) => {
      toast.success("Second Player joined the game");
    });

    socket.on("error", (data) => {
      if (data?.message) {
        toast.error(data.message);
        return;
      }
    });

    socket.on("opponent_move", (data) => {
      console.log("Opponent move received:", data);
      setBoardFen(data.fen);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
      socket.off("opponent_move");
    };
  }, []);

  // Handle move submission
  const onDrop = (sourceSquare: string, targetSquare: string): boolean => {
    // const moveNotation = `${sourceSquare}${targetSquare}`;
    const newGame = new Chess(boardFen || game.fen());
    const validMove = newGame.move({ from: sourceSquare, to: targetSquare });
    if (!validMove) {
      alert("Invalid move:");
      return false;
    }

    // Ensure socket is connected before emitting
    if (!socketRef.current || !socketRef.current.connected) {
      console.log("Socket is not connected!");
      return false;
    }
    
    const move: Move = {
      gameId,
      from: sourceSquare,
      to: targetSquare,
      notation: validMove.san,
    };


    socketRef.current.emit("move", { gameId, move }, (data: any) => {
      if (data.error) {
        console.log("Error:", data.error);
        return;
      }
      console.log("Move successful:", data);
      // setBoardFen(data.fen);
    });

    return true;
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold">Chess Game</h2>
      <Chessboard
        position={boardFen}
        onPieceDrop={onDrop}
        boardOrientation={playerColor}
      />
    </div>
  );
};

export default ChessBoard;
