const CAL_LINK = "ayush-kumar-ujqipk/15min";
const CAL_EMBED_SRC = `https://cal.com/${CAL_LINK}?embed=true&theme=light`;

export default function BookACall() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100dvh",
        width: "100%",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          padding: "clamp(32px, 5vh, 56px) 24px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* heading */}
        <div style={{ textAlign: "center", marginBottom: "clamp(16px, 3vh, 28px)" }}>
          <p className="om-eyebrow" style={{ marginBottom: 14 }}>Book a call</p>
          <h1 className="om-heading" style={{ fontSize: "clamp(28px, 4.4vw, 44px)", maxWidth: 560, margin: "0 auto" }}>
            Let's talk about your content
          </h1>
          <p
            className="om-body"
            style={{ fontSize: 15, maxWidth: 440, margin: "14px auto 0", color: "var(--text-muted)" }}
          >
            Pick a slot below — 15 minutes, no pitch deck required.
          </p>
        </div>

        {/* Cal.com inline embed — a plain sandboxed iframe is the most
            robust and lightest-weight way to embed Cal.com; it avoids
            pulling in a third-party script (smaller CSP surface, nothing
            to break if Cal.com changes their widget internals). */}
        <div
          style={{
            width: "100%",
            borderRadius: 20,
            border: "1px solid var(--hairline)",
            overflow: "hidden",
            background: "var(--bg)",
          }}
        >
          <iframe
            src={CAL_EMBED_SRC}
            title="Book a call with Orbit Media"
            style={{ minWidth: 280, height: "min(720px, 78vh)", width: "100%", border: "none", display: "block" }}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>
    </div>
  );
}