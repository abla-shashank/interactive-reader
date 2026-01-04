import { useEffect, useState } from "react";

const text =
  "Read easily. This reader highlights text at your pace. Adjust speed as needed.";

export default function App() {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1200);

  useEffect(() => {
    if (!playing) return;
    if (active >= sentences.length - 1) return;

    const timer = setTimeout(() => {
      setActive(active + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [playing, active, speed, sentences.length]);

  return (
    <main>
      <h1>Interactive Reader</h1>

      <div className="reader">
        {sentences.map((s, i) => (
          <span
            key={i}
            className={
              i === active ? "active" : i < active ? "read" : ""
            }
          >
            {s}
          </span>
        ))}
      </div>

      <div className="controls">
        <button onClick={() => setPlaying(!playing)}>
          {playing ? "Pause" : "Play"}
        </button>

        <input
          type="range"
          min="400"
          max="2000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>
    </main>
  );
}
