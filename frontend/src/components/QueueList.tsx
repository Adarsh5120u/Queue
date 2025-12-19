import type { Token } from "../types";

export default function QueueList({ tokens }: { tokens: Token[] }) {
  return (
    <ol>
      {tokens.map(t => (
        <li key={t.id}>
          #{t.id} - {t.name}
        </li>
      ))}
    </ol>
  );
}

