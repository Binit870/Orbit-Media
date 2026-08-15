import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * Solid accent pill button used for every "Book a Call" CTA across the site.
 * Renders a react-router <Link> for internal paths, a plain <a> for
 * external/hash links.
 */
const BOOKING_URL = "https://cal.com/ayush-kumar-ujqipk/15min";

export function AccentButton({ to = BOOKING_URL, children = "Book a Call", variant = "solid", icon = true, ...props }) {
  const className = variant === "solid" ? "om-btn" : "om-btn-outline";
  const isInternal = to.startsWith("/");

  const content = (
    <>
      {children}
      {icon && variant !== "solid" && <ArrowUpRight size={14} strokeWidth={2} />}
    </>
  );

  if (isInternal) {
    return (
      <Link to={to} className={className} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a href={to} className={className} target={to.startsWith("http") ? "_blank" : undefined} rel={to.startsWith("http") ? "noreferrer" : undefined} {...props}>
      {content}
    </a>
  );
}

/** "EXPLORE →" style accent text link used throughout service blocks. */
export function ArrowLink({ to, children = "Explore", ...props }) {
  return (
    <Link to={to} className="om-link-accent" {...props}>
      {children}
      <ArrowRight size={13} strokeWidth={2.2} />
    </Link>
  );
}
