import { useEffect, useRef, useState } from "react";

const API_URL = "http://localhost:3000/api/build";

const QUEUE_STEPS = [
  "queued",
  "reading prompt",
  "drafting layout",
  "writing markup",
  "styling",
];

function Wordmark() {
  return (
    <div className="flex items-center gap-2 text-ink-soft">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="1" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1 6.5H17M6.5 6.5V17" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="font-mono text-[13px] tracking-tight">drafting table</span>
    </div>
  );
}

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("idle"); // idle | building | done | error
  const [log, setLog] = useState([]);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const timers = useRef([]);
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [log]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const appendLog = (line) =>
    setLog((prev) => [...prev, { line, time: new Date().toLocaleTimeString([], { hour12: false }) }]);

  async function handleBuild(e) {
    e.preventDefault();
    if (!prompt.trim() || status === "building") return;

    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStatus("building");
    setResult(null);
    setErrorMsg("");
    setLog([]);

    QUEUE_STEPS.forEach((step, i) => {
      const t = setTimeout(() => appendLog(step), i === 0 ? 0 : i * 900 + Math.random() * 400);
      timers.current.push(t);
    });

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      timers.current.forEach(clearTimeout);

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Build failed");
      }

      appendLog("build complete");
      setResult(data);
      setStatus("done");
    } catch (err) {
      timers.current.forEach(clearTimeout);
      appendLog("build failed");
      setErrorMsg(err.message || "Something went wrong reaching the build server.");
      setStatus("error");
    }
  }

  const building = status === "building";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 sm:px-10 pt-8">
        <Wordmark />
      </header>

      <main className="flex-1 px-6 sm:px-10 py-10 sm:py-16">
        <div className="max-w-[640px] mx-auto">
          <h1 className="font-display text-[2.1rem] sm:text-[2.6rem] leading-[1.08] text-ink">
            Describe the site you want,
            <br />
            <span className="italic text-ink-soft">and it gets drafted.</span>
          </h1>

          <form onSubmit={handleBuild} className="mt-8">
            <label htmlFor="prompt" className="block text-sm text-ink-soft mb-2">
              What are we building?
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A one-page portfolio for a ceramics studio, warm and minimal, with a contact form."
              rows={4}
              disabled={building}
              className="w-full resize-none rounded-sm border border-paper-line bg-panel px-4 py-3 text-[15px]
                         text-ink placeholder:text-ink-soft/60 outline-none
                         focus-visible:ring-2 focus-visible:ring-rust/60 focus-visible:border-rust
                         disabled:opacity-60 transition-colors"
            />

            <div className="mt-4 flex items-center gap-4">
              <button
                type="submit"
                disabled={!prompt.trim() || building}
                className="inline-flex items-center gap-2 rounded-sm bg-rust px-5 py-2.5 text-[14px] font-medium text-paper
                           hover:bg-rust-dark active:bg-rust-dark disabled:bg-ink-soft/40 disabled:cursor-not-allowed
                           transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
              >
                {building ? "Building" : "Build the site"}
                {building && (
                  <span className="h-3 w-3 rounded-full border-2 border-paper/40 border-t-paper animate-spin" />
                )}
              </button>
              {status === "error" && (
                <span className="text-[13px] text-rust-dark">{errorMsg}</span>
              )}
            </div>
          </form>

          {log.length > 0 && (
            <div className="mt-8 rounded-sm border border-paper-line bg-ink text-paper/90 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-paper/10">
                <span className="font-mono text-[11px] tracking-wide text-paper/50">build log</span>
                {status === "done" && (
                  <span className="font-mono text-[11px] text-sage">done</span>
                )}
              </div>
              <div className="px-4 py-3 font-mono text-[13px] leading-relaxed max-h-48 overflow-y-auto">
                {log.map((entry, i) => (
                  <div key={i} className="flex gap-3 text-paper/80">
                    <span className="text-paper/35">{entry.time}</span>
                    <span>{entry.line}</span>
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>
            </div>
          )}

          {status === "done" && result && (
            <div className="mt-6 rounded-sm border border-paper-line bg-panel px-5 py-4">
              <p className="text-[15px] text-ink">{result.message}</p>
              {result.url && (
                <a
                  href={result.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-[14px] text-rust hover:text-rust-dark underline underline-offset-2"
                >
                  Open the generated site
                </a>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="px-6 sm:px-10 pb-8">
        <p className="max-w-[640px] mx-auto text-[12px] text-ink-soft/70">
          Talking to {API_URL}
        </p>
      </footer>
    </div>
  );
}
