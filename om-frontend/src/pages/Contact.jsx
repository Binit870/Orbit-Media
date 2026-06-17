import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

const initialForm = { name: "", email: "", company: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // NOTE: this form is front-end only for now — wire it up to an email
    // service (e.g. Formspree, Resend) or your CRM before going live.
    setSubmitted(true);
  };

  return (
    <section style={{ padding: "80px 24px 110px" }}>
      <div className="om-container" style={{ maxWidth: 1000 }}>
        <div className="om-contact-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64 }}>
          <div>
            <p className="om-eyebrow" style={{ marginBottom: 18 }}>Contact</p>
            <h1 className="om-heading" style={{ fontSize: "clamp(36px, 6vw, 58px)", marginBottom: 18 }}>
              Let's <span className="om-heading-italic">Talk</span>
            </h1>
            <p className="om-body" style={{ fontSize: 15.5, marginBottom: 36, maxWidth: 440 }}>
              Tell us a bit about your brand and what you're trying to build.
              We reply to every message within one business day.
            </p>

            {submitted ? (
              <div className="om-card" style={{ padding: 28 }}>
                <p className="om-heading" style={{ fontSize: 22, marginBottom: 8 }}>Message sent</p>
                <p className="om-body" style={{ fontSize: 14.5 }}>
                  Thanks, {form.name.split(" ")[0] || "there"} — we'll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="om-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
                  <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <Field label="Company" name="company" value={form.company} onChange={handleChange} />
                <Field label="Message" name="message" textarea value={form.message} onChange={handleChange} required />
                <button type="submit" className="om-btn" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                  Send Message <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>

          <div>
            <div className="om-card" style={{ padding: 32, marginBottom: 20 }}>
              <p className="om-eyebrow" style={{ marginBottom: 16 }}>Prefer to talk live?</p>
              <p className="om-heading" style={{ fontSize: 26, marginBottom: 14 }}>Book a free call</p>
              <p className="om-body" style={{ fontSize: 14, marginBottom: 22 }}>
                20 minutes, no pressure — we'll learn about your brand and map out next steps.
              </p>
              <a href="#" className="om-btn" style={{ width: "100%" }}>Book a Call</a>
            </div>

            <div className="om-card" style={{ padding: 32 }}>
              <p className="om-eyebrow" style={{ marginBottom: 16 }}>Email Us</p>
              <a href="mailto:hello@orbitmedia.in" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                <Mail size={16} color="var(--gold)" />
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "var(--text)" }}>
                  hello@orbitmedia.in
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .om-contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .om-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Field({ label, name, value, onChange, type = "text", textarea = false, required = false }) {
  const sharedStyle = {
    width: "100%",
    background: "var(--bg-soft)",
    border: "1px solid var(--hairline)",
    borderRadius: 10,
    padding: "12px 14px",
    color: "var(--text)",
    fontFamily: "Inter, sans-serif",
    fontSize: 14.5,
    outline: "none",
  };

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "var(--text-muted)", fontWeight: 500 }}>
        {label}
      </span>
      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} required={required} rows={4} style={{ ...sharedStyle, resize: "vertical", fontFamily: "Inter, sans-serif" }} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} required={required} style={sharedStyle} />
      )}
    </label>
  );
}
