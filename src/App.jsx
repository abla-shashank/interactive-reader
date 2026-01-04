import { useEffect, useState } from "react";

const text = `
Reading is supposed to feel natural, but for many people it quietly becomes exhausting. The eyes move faster than the mind, attention drifts, and the act of reading turns into effort rather than flow. This reader is built to slow things down just enough so focus can return without force.

Instead of asking you to adapt to text, the text adapts to you. Each character appears with intention. What you have already read stays visible and grounded, while what is coming next waits patiently. The goal is not speed for the sake of speed. It is rhythm. A pace that feels steady rather than rushed.

Small details matter here. Reduced visual noise helps the brain stay oriented. Clear contrast keeps the current focus unmistakable. Previously read content remains present so context is never lost. Nothing jumps suddenly. Nothing disappears. Progress feels continuous rather than fragmented.

This approach works well for long-form reading, but it is especially helpful when attention fluctuates. If your focus breaks, you can resume exactly where your eyes land. A single click is enough. There is no penalty for pausing. No pressure to finish. Reading becomes something you return to, not something you push through.

Accessibility is not treated as a separate feature. It is foundational. Motion is subtle. Colors are chosen to reduce strain rather than impress. Controls are simple and predictable. The interface stays quiet so the words can do the work they are meant to do.

This reader is not trying to replace books or articles. It is trying to create a better container for them. One that respects different reading styles and different cognitive states. Some days you move quickly. Other days you need space. Both are valid.

Over time, the hope is that reading feels less like consumption and more like presence. You are not skimming past ideas. You are spending time with them. One character at a time, at a speed that belongs to you.
`;

export default function App() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(60);

  useEffect(() => {
    if (!playing) return;
    if (index >= text.length) return;

    const t = setTimeout(() => {
      setIndex((i) => i + 1);
    }, speed);

    return () => clearTimeout(t);
  }, [playing, index, speed]);

  const handleClick = (i) => {
    setIndex(i);
    setPlaying(true);
  };

  return (
    <main>
      <h1>Interactive Reader</h1>

      <div className="reader">
        {text.split("").map((char, i) => {
          let className = "char";
          if (i < index) className += " read";
          if (i === index) className += " active";

          return (
            <span
              key={i}
              className={className}
              onClick={() => handleClick(i)}
            >
              {char}
            </span>
          );
        })}
      </div>

      <div className="controls">
        <button onClick={() => setPlaying(!playing)}>
          {playing ? "Pause" : "Play"}
        </button>

        <input
          type="range"
          min="30"
          max="120"
          step="5"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>
    </main>
  );
}

