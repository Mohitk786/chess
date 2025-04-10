"use client";
import { useEffect, useRef, useState } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { io, Socket } from "socket.io-client";
import { Move, GameState } from "@/types/game";
import toast from "react-hot-toast";

interface ChessBoardProps {
  gameId: number;
}

interface Move2 {
  sourceSquare: string;
  targetSquare: string;
}

interface IsPromotingParams {
  fen: string;
  move: Move2;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ gameId }) => {
  const [game, setGame] = useState(new Chess());
  const [boardFen, setBoardFen] = useState<string>();
  const socketRef = useRef<Socket | null>(null);
  const [playerColor, setPlayerColor] = useState<"white" | "black">("white");

  //http://192.168.149.126:8000/api

  useEffect(() => {
    const socket = io("ws://51.20.79.155:5000", {
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

  const promptUserForPromotionPiece = (): "q" | "r" | "b" | "n" => {
    const choices = ["q", "r", "b", "n"];
    let choice: string | null = null;

    while (!choices.includes(choice as string)) {
      choice = prompt(
        "Promote to (q = Queen, r = Rook, b = Bishop, n = Knight):"
      )?.toLowerCase() as string;
    }

    return choice as "q" | "r" | "b" | "n";
  };

  const onDrop = (sourceSquare: string, targetSquare: string): boolean => {
    const newGame = new Chess(boardFen || game.fen());

    let validMove: any;
    try {
      validMove = newGame.move({
        from: sourceSquare,
        to: targetSquare,
      });
    } catch (err) {
      toast.error("Invalid move!");
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
        return;
      }
      console.log("Move successful:", data);
      setBoardFen(data.fen);
    });

    const isCheckmate = newGame.isCheckmate();
    if (isCheckmate) {
      alert("Checkmate! Game Over.");
      return false;
    }

    const isStalemate = newGame.isStalemate();
    if (isStalemate) {
      alert("Stalemate! Game Over.");
      return false;
    }

    const isInsufficientMaterial = newGame.isInsufficientMaterial();
    if (isInsufficientMaterial) {
      alert("Insufficient material! Game Over.");
      return false;
    }

    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h2 className="text-lg font-semibold">Chess Game</h2>
      <div className="">
        <Chessboard
          position={boardFen}
          onPieceDrop={onDrop}
          boardOrientation={playerColor}
          boardWidth={800}
        />
      </div>
    </div>
  );
};

export default ChessBoard;
