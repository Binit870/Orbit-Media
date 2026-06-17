import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 60,
        width: 46,
        height: 46,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-gold)",
        color: "var(--gold)",
        cursor: "pointer",
        boxShadow: "var(--shadow)",
        transition: "transform 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {isDark ? <Sun size={19} strokeWidth={1.6} /> : <Moon size={18} strokeWidth={1.6} />}
    </button>
  );
}
