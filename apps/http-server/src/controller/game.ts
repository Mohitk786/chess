import { Request, Response } from "express";
import db from "@chess/db/client";

export const createGame = async (req: Request, res: Response) => {
  try {
    const { color } = req.body;
    const userId = req.userId; 
    const whitePlayerId = color === "white" ? Number(userId) : null;
    const blackPlayerId = color === "black" ? Number(userId) : null;

    const game = await db.game.create({
      data: {
        whiteId: whitePlayerId,
        blackId: blackPlayerId,
        fen: "rnbqkb1r/pppppppp/8/8/8/8/PPPPPPPP/RNBQKB1R w KQkq - 0 1",
        result: "IN_PROGRESS",
      },
    });

    res.status(201).json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
