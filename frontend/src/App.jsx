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
        <rect
          x="1"
          y="1"
          width="16"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.2"
        />

        <path
          d="M1 6.5H17M6.5 6.5V17"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>

      <span className="font-mono text-[13px] tracking-tight">
        drafting table
      </span>
    </div>
  );
}

export default function App() {
  const [prompt, setPrompt] = useState("");

  const [status, setStatus] = useState("idle");
  // idle | building | done | error

  const [log, setLog] = useState([]);

  const [result, setResult] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");

  const [hosted, setHosted] = useState(false);

  const timers = useRef([]);

  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({
      block: "nearest",
    });
  }, [log]);

  useEffect(() => {
    return () =>
      timers.current.forEach(clearTimeout);
  }, []);

  const appendLog = (line) =>
    setLog((prev) => [
      ...prev,
      {
        line,
        time: new Date().toLocaleTimeString(
          [],
          {
            hour12: false,
          }
        ),
      },
    ]);

  async function handleBuild(e) {
    e.preventDefault();

    if (
      !prompt.trim() ||
      status === "building"
    ) {
      return;
    }

    timers.current.forEach(clearTimeout);
    timers.current = [];

    setStatus("building");
    setResult(null);
    setErrorMsg("");
    setHosted(false);
    setLog([]);

    QUEUE_STEPS.forEach((step, i) => {
      const t = setTimeout(
        () => appendLog(step),
        i === 0
          ? 0
          : i * 900 +
              Math.random() * 400
      );

      timers.current.push(t);
    });

    try {
      const res = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await res.json();

      timers.current.forEach(clearTimeout);

      if (!res.ok || !data.success) {
        throw new Error(
          data.error || "Build failed"
        );
      }

      appendLog("build complete");

      setResult(data);

      setStatus("done");
    } catch (err) {
      timers.current.forEach(clearTimeout);

      appendLog("build failed");

      setErrorMsg(
        err.message ||
          "Something went wrong reaching the build server."
      );

      setStatus("error");
    }
  }

  function handleHostLocally() {
    if (!result?.url) {
      return;
    }

    appendLog("hosting locally");

    setHosted(true);

    /*
     * Open the generated website in a new tab.
     */
    window.open(
      result.url,
      "_blank",
      "noopener,noreferrer"
    );
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

            <span className="italic text-ink-soft">
              and it gets drafted.
            </span>
          </h1>

          <form
            onSubmit={handleBuild}
            className="mt-8"
          >
            <label
              htmlFor="prompt"
              className="block text-sm text-ink-soft mb-2"
            >
              What are we building?
            </label>

            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) =>
                setPrompt(e.target.value)
              }
              placeholder="A one-page portfolio for a ceramics studio, warm and minimal, with a contact form."
              rows={4}
              disabled={building}
              className="w-full resize-none rounded-sm border border-paper-line bg-panel px-4 py-3 text-[15px]
                         text-ink placeholder:text-ink-soft/60 outline-none
                         focus-visible:ring-2 focus-visible:ring-rust/60 focus-visible:border-rust
                         disabled:opacity-60 transition-colors"
            />

            <div className="mt-4 flex items-center gap-4 flex-wrap">

              {/* BUILD BUTTON */}

              <button
                type="submit"
                disabled={
                  !prompt.trim() ||
                  building
                }
                className="inline-flex items-center gap-2 rounded-sm bg-rust px-5 py-2.5 text-[14px] font-medium text-paper
                           hover:bg-rust-dark active:bg-rust-dark disabled:bg-ink-soft/40 disabled:cursor-not-allowed
                           transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
              >
                {building
                  ? "Building"
                  : "Build the site"}

                {building && (
                  <span
                    className="h-3 w-3 rounded-full border-2 border-paper/40 border-t-paper animate-spin"
                  />
                )}
              </button>

              {/* HOST LOCALLY BUTTON */}

              {status === "done" &&
                result?.url && (
                  <button
                    type="button"
                    onClick={
                      handleHostLocally
                    }
                    className="inline-flex items-center gap-2 rounded-sm border border-paper-line bg-panel px-5 py-2.5 text-[14px] font-medium text-ink
                               hover:bg-paper-line/30 active:bg-paper-line/50
                               transition-colors
                               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
                  >
                    {/* External link icon */}

                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M14 3h7v7" />
                      <path d="M10 14L21 3" />
                      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                    </svg>

                    {hosted
                      ? "Open locally"
                      : "Host locally"}
                  </button>
                )}

              {status === "error" && (
                <span className="text-[13px] text-rust-dark">
                  {errorMsg}
                </span>
              )}
            </div>
          </form>

          {/* BUILD LOG */}

          {log.length > 0 && (
            <div className="mt-8 rounded-sm border border-paper-line bg-ink text-paper/90 overflow-hidden">

              <div className="flex items-center justify-between px-4 py-2 border-b border-paper/10">

                <span className="font-mono text-[11px] tracking-wide text-paper/50">
                  build log
                </span>

                {status === "done" && (
                  <span className="font-mono text-[11px] text-sage">
                    done
                  </span>
                )}
              </div>

              <div className="px-4 py-3 font-mono text-[13px] leading-relaxed max-h-48 overflow-y-auto">

                {log.map(
                  (entry, i) => (
                    <div
                      key={i}
                      className="flex gap-3 text-paper/80"
                    >
                      <span className="text-paper/35">
                        {entry.time}
                      </span>

                      <span>
                        {entry.line}
                      </span>
                    </div>
                  )
                )}

                <div ref={logEndRef} />
              </div>
            </div>
          )}

          {/* RESULT */}

          {status === "done" &&
            result && (
              <div className="mt-6 rounded-sm border border-paper-line bg-panel px-5 py-4">

                <p className="text-[15px] text-ink">
                  {result.message}
                </p>

                {result.url && (
                  <div className="mt-3">

                    <p className="font-mono text-[12px] text-ink-soft/70">
                      Local preview
                    </p>

                    <p className="mt-1 font-mono text-[13px] text-rust">
                      {result.url}
                    </p>

                  </div>
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