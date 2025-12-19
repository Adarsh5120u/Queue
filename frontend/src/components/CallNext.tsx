import { callNext } from "../api";

export default function CallNext({ onCalled }: { onCalled: (result: any) => void }) {
  const click = async () => {
    onCalled(await callNext());
  };

  return <button onClick={click}>Call Next</button>;
}
