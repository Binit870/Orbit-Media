import ProcessCard from "./ProcessCard";

const Process = () => {
  return (
    <main style={{
      position: "relative",
      minHeight: "100vh",
      overflow: "hidden",
      backgroundColor: "#0a0a0a",
    }}>
      {/* Ambient glow */}
      <div style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          left: "50%",
          top: "-10%",
          height: "480px",
          width: "760px",
          transform: "translateX(-50%)",
          borderRadius: "9999px",
          backgroundColor: "rgba(245,158,11,0.07)",
          filter: "blur(140px)",
        }} />
      </div>

      <section style={{
        position: "relative",
        zIndex: 1,
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "5rem 1.5rem 6rem",
      }}>
        <header style={{ maxWidth: "768px", marginBottom: "4rem" }}>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "800",
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.15,
          }}>
            What's the <span style={{ color: "#f59e0b" }}>process?</span>
          </h1>
          <p style={{
            marginTop: "1rem",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.6,
          }}>
            We become YOUR remote micro team, at either of the 3 levels.
          </p>
        </header>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          alignItems: "stretch",
        }}>
          <ProcessCard
            label="End to End"
            noteColor="green"
            rotate="-rotate-3"
            items={[
              "Brand Strategy",
              "Visual Identity Revamp",
              "Content Ideation",
              "Scripting",
              "Content Ideation",
              "Planning content shoots",
              "Complete guidance",
              "World Class Edits",
              "Organic Lead Gen Strategies",
              "Posting across platforms",
              "Growth reports",
              "Check in calls",
              "Month to Month plans",
              "20–25 video edits a month",
            ]}
          />
          <ProcessCard
            label="Post Production"
            noteColor="yellow"
            rotate="-rotate-2"
            items={[
              "Complete project management",
              "World class edits",
              "Custom packages for number of edits",
              "Content Posting across platforms",
              { label: "Additional:", sub: ["– Captions", "– Thumbnails"] },
              "Check in calls",
            ]}
          />
          <ProcessCard
            label="Content Flywheel"
            noteColor="purple"
            rotate="rotate-3"
            items={[
              "Brand Strategy",
              "Clipping from long form to world class edits",
              "End to End repurposing on all platforms",
              "Growth via trial reels",
              "Captions",
              "Complete Project Management",
              "Check in Calls",
              "Growth Reports",
              "Over 60 edits a month",
            ]}
          />
        </div>
      </section>
    </main>
  );
};

export default Process;