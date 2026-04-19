import { Hand, Smile } from "lucide-react";

const testimonials = [
  {
    quote: "The videos are fantastic. Very happy with what's happening.",
    name: "Andrew Ross Sorkin",
    role: "American Journalist and Author",
    bg: "hsl(48, 95%, 70%)",
    rotate: "-6deg",
    translateY: "0px",
    icon: <Hand size={28} color="#000" />,
    iconBg: "hsl(245, 90%, 80%)",
  },
  {
    quote: "During our YC period, the launch video drove a lot of hype and customers inbound. Super responsive and proactive team.",
    name: "Rohit Sirosh",
    role: "Founder, Mimos AI",
    bg: "hsl(245, 90%, 80%)",
    rotate: "0deg",
    translateY: "-40px",
    icon: null,
    iconBg: null,
  },
  {
    quote: "The edits have been amazing, the team does a great job operationally too!",
    name: "Daniel Del carmen",
    role: "Creative director, Mike Posner",
    bg: "hsl(135, 70%, 80%)",
    rotate: "6deg",
    translateY: "20px",
    icon: <Smile size={28} color="#000" />,
    iconBg: "hsl(135, 70%, 80%)",
  },
];

const ShortTestimonials = () => {
  return (
    <section style={{
      position: "relative",
      width: "100%",
      overflow: "hidden",
      backgroundColor: "#0a0a0a",
      padding: "4rem 0 6rem",
      backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2.5rem",
          alignItems: "center",
        }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "center", transform: `translateY(${t.translateY})` }}>
              {t.icon ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    backgroundColor: t.iconBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                    outline: "2px solid rgba(255,255,255,0.2)",
                  }}>
                    {t.icon}
                  </div>
                  <div style={{
                    marginTop: "1.5rem",
                    width: "280px",
                    borderRadius: "6px",
                    padding: "1.5rem",
                    backgroundColor: t.bg,
                    transform: `rotate(${t.rotate})`,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                    color: "#000",
                  }}>
                    <p style={{ fontSize: "15px", lineHeight: "1.6", margin: 0 }}>{t.quote}</p>
                    <p style={{ marginTop: "2rem", marginBottom: 0, fontWeight: "700", fontSize: "15px" }}>{t.name}</p>
                    <p style={{ margin: 0, fontSize: "13px", color: "rgba(0,0,0,0.65)" }}>{t.role}</p>
                  </div>
                </div>
              ) : (
                <div style={{
                  width: "280px",
                  borderRadius: "6px",
                  padding: "1.5rem",
                  backgroundColor: t.bg,
                  transform: `rotate(${t.rotate})`,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                  color: "#000",
                }}>
                  <p style={{ fontSize: "15px", lineHeight: "1.6", margin: 0 }}>{t.quote}</p>
                  <p style={{ marginTop: "1.5rem", marginBottom: 0, fontWeight: "700", fontSize: "15px" }}>{t.name}</p>
                  <p style={{ margin: 0, fontSize: "13px", color: "rgba(0,0,0,0.65)" }}>{t.role}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShortTestimonials;
