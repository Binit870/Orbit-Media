import LegalPage from "../components/ui/LegalPage";

const SECTIONS = [
  {
    heading: "Acceptance of terms",
    body: "By accessing or using the Orbit Media website, you agree to be bound by these Terms of Service. If you do not agree, please do not use this site.",
  },
  {
    heading: "Services",
    body: "Orbit Media provides content production services including podcasting, video production, and brand content, as described on this site. Specific engagement terms are agreed separately for each project.",
  },
  {
    heading: "Intellectual property",
    body: "All content on this website, including logos, copy, and media, is the property of Orbit Media unless otherwise noted, and may not be reproduced without permission.",
  },
  {
    heading: "Limitation of liability",
    body: "Orbit Media is not liable for any indirect, incidental, or consequential damages arising from the use of this website or our services, to the fullest extent permitted by law.",
  },
  {
    heading: "Contact us",
    body: "Questions about these terms can be sent to hello@orbit-media.in.",
  },
];

export default function Terms() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="August 2026"
      sections={SECTIONS}
    />
  );
}
