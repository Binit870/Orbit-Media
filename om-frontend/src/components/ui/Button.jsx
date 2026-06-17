import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * Solid gold pill button used for every "Book a Call" CTA across the site.
 * Renders a react-router <Link> for internal paths, a plain <a> for
 * external/hash links.
 */
export function GoldButton({ to = "/contact", children = "Book a Call", variant = "solid", icon = true, ...props }) {
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

/** "EXPLORE →" style gold text link used throughout service blocks. */
export function ArrowLink({ to, children = "Explore", ...props }) {
  return (
    <Link to={to} className="om-link-gold" {...props}>
      {children}
      <ArrowRight size={13} strokeWidth={2.2} />
    </Link>
  );
}
