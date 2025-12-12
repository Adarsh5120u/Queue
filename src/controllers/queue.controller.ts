import { Request, Response } from "express";
import { pool } from "../db";

// Add a new token
export const addToken = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Insert with default status 'waiting'
    const query = "INSERT INTO queue (name, status) VALUES ($1, 'waiting') RETURNING *";
    const result = await pool.query(query, [name]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all waiting tokens
export const getQueue = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM queue WHERE status = 'waiting' ORDER BY id ASC"
    );

    res.json({ length: result.rows.length,
      queue: result.rows,});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching queue" });
  }
};

// Call next token (pop)
export const callNext = async (req: Request, res: Response) => {
  try {
    const selectResult = await pool.query(
      "SELECT * FROM queue WHERE status = 'waiting' ORDER BY id ASC LIMIT 1"
    );

    if (selectResult.rows.length === 0) {
      return res.json({ message: "No tokens left" });
    }

    const nextToken = selectResult.rows[0];
    await pool.query("DELETE FROM queue WHERE id = $1", [nextToken.id]);
    res.json(nextToken);}
     catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error calling next token" });
  }
};
