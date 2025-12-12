import React, { useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  const [enqDisabled, setEnqDisabled] = useState(false);

  const API = "http://localhost:5173";

  function enqueue() {
    fetch(API + "/enqueue", { method: "POST" })
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        setMsg("Enqueued. Position: " + d.position);
        setEnqDisabled(true);
      })
      .catch(function () {
        setMsg("Enqueue failed");
      });
  }

  function checkPosition() {
    fetch(API + "/position")
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        setMsg("Your position: " + d.position);
      })
      .catch(function () {
        setMsg("Failed to get position");
      });
  }

  function getLength() {
    fetch(API + "/length")
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        setMsg("Queue length: " + d.length);
      })
      .catch(function () {
        setMsg("Failed to get length");
      });
  }

  function dequeue() {
    fetch(API + "/dequeue", { method: "POST" })
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        setMsg("Dequeued: " + d.item);
      })
      .catch(function () {
        setMsg("Dequeue failed");
      });
  }

  return (
    <div>
      <br></br>
      <button onClick={enqueue} disabled={enqDisabled}>
        Enqueue
      </button>
      <button onClick={checkPosition}>Check Position</button>
      <button onClick={getLength}>Get Length</button>
      <button onClick={dequeue}>Dequeue</button>
      <br></br>
      <p>{msg}</p>
    </div>
  );
}

export default App;
