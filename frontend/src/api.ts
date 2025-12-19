import type { Token } from "./types";

const BASE_URL = "http://localhost:5000";

export async function getQueue() {
  const res = await fetch(`${BASE_URL}/queue`);
  return res.ok ? res.json() : { queue: [] };
}

export async function addToken(name: string): Promise<Token | null> {
  const res = await fetch(`${BASE_URL}/queue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  return res.ok ? res.json() : null;
}

export async function callNext() {
  const res = await fetch(`${BASE_URL}/queue/next`, { method: "POST" });
  return res.ok ? res.json() : { message: "Error calling next" };
}
