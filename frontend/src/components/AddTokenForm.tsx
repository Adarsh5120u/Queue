import { useState } from "react";
import { addToken } from "../api";

export default function AddTokenForm({ onAdded }: { onAdded: () => void }) {
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(false); // ✅ NEW

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || disabled) return;

    setDisabled(true); // 🔒 disable after one click

    try {
      await addToken(name);
      setName("");
      onAdded();
    } finally {
      // ❌ do NOT re-enable here
      // it will stay disabled until dequeue / refresh
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={disabled}
      />

      <button disabled={disabled}>
        {disabled ? "Token Added" : "Add Token"}
      </button>
    </form>
  );
}
