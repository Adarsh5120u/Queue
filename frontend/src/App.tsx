import { useEffect, useState } from "react";
import AddTokenForm from "./components/AddTokenForm";
import CallNext from "./components/CallNext";
import type { Token } from "./types";
import { getQueue } from "./api";

export default function App() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadQueue = async () => {
    setLoading(true);
    const data = await getQueue();
    setTokens(data.queue || []);
    setLoading(false);
  };

  useEffect(() => {
    loadQueue();
  }, []);

  const onCalled = async (result: any) => {
    setMessage(result.message || "Dequeued");
    setTimeout(() => {
      setMessage(null);
    }, 3000);
    await loadQueue();
  };

  return (
    <div>
      <h1>Queue Manager</h1>
      <AddTokenForm onAdded={loadQueue} />
      <CallNext onCalled={onCalled} />
      {message && <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>}
      {loading ? (
  <p>Loading...</p>
) : (
  <p>Queue Length: {tokens.length}</p>
)}
    </div>
  );
}


