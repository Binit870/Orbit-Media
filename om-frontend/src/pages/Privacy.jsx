import LegalPage from "../components/ui/LegalPage";

const SECTIONS = [
  {
    heading: "Information we collect",
    body: "We collect information you provide directly to us, such as your name, email address, and project details when you reach out through our contact form or booking page, along with basic usage data collected automatically when you visit our site.",
  },
  {
    heading: "How we use your information",
    body: "We use the information we collect to respond to inquiries, schedule calls, deliver the services you've requested, and improve our website and offerings over time.",
  },
  {
    heading: "Sharing your information",
    body: "We do not sell your personal information. We may share information with trusted service providers who help us operate our business, such as scheduling and analytics tools, under appropriate confidentiality obligations.",
  },
  {
    heading: "Your rights",
    body: "You may request access to, correction of, or deletion of your personal information at any time by contacting us using the details below.",
  },
  {
    heading: "Contact us",
    body: "If you have any questions about this policy, please reach out to hello@orbit-media.in.",
  },
];

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="August 2026"
      sections={SECTIONS}
    />
  );
}
