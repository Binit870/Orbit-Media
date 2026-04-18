import { Check } from "lucide-react";

const noteBg = {
  green: "#bbf7d0",
  yellow: "#fef08a",
  purple: "#e9d5ff",
};

const noteText = {
  green: "#14532d",
  yellow: "#713f12",
  purple: "#3b0764",
};

const rotateMap = {
  "-rotate-3": "rotate(-3deg)",
  "-rotate-2": "rotate(-2deg)",
  "rotate-3": "rotate(3deg)",
};

const ProcessCard = ({ label, noteColor, rotate, items = [] }) => {
  return (
    <div style={{ position: "relative", paddingTop: "2.5rem" }}>
      <div style={{
        position: "absolute",
        top: "-4px",
        left: "24px",
        zIndex: 10,
        backgroundColor: noteBg[noteColor],
        color: noteText[noteColor],
        padding: "6px 20px",
        fontSize: "1.2rem",
        fontWeight: "700",
        fontStyle: "italic",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
        transform: rotateMap[rotate] ?? "rotate(0deg)",
        borderRadius: "2px",
        whiteSpace: "nowrap",
      }}>
        {label}
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "1rem",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "2.5rem 1.75rem 1.75rem",
        backgroundColor: "#111111",
      }}>
        <ul style={{ flex: 1, listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span style={{
                marginTop: "1px",
                width: "22px",
                height: "22px",
                flexShrink: 0,
                borderRadius: "50%",
                border: "1.5px solid #f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Check size={12} strokeWidth={3} color="#f59e0b" />
              </span>
              {typeof item === "string" ? (
                <span style={{ fontSize: "15px", lineHeight: "1.5", color: "#d1d5db" }}>{item}</span>
              ) : (
                <div style={{ fontSize: "15px", lineHeight: "1.5", color: "#d1d5db" }}>
                  <p style={{ margin: 0, fontWeight: "600", color: "#f3f4f6" }}>{item.label}</p>
                  {(item.sub ?? []).map((s, j) => (
                    <p key={j} style={{ margin: 0, color: "#9ca3af" }}>{s}</p>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <button
          style={{
            marginTop: "2rem",
            width: "100%",
            borderRadius: "0.6rem",
            backgroundColor: "#f59e0b",
            padding: "14px",
            fontSize: "1rem",
            fontWeight: "600",
            color: "#000",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#d97706"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "#f59e0b"}
          onClick={() => alert(`Thanks — we'll be in touch shortly.\nPlan selected: ${label}`)}
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default ProcessCard;