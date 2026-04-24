import "../styles.css";
import "../premium.css";
import SiteBehavior from "../components/site-behavior";

export const metadata = {
  title: {
    default: "9 to 5 Office",
    template: "%s | 9 to 5 Office"
  },
  description:
    "Operational support for forensic and evaluation-based practices, built around referrals, scheduling, workflows, reporting, and case visibility."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SiteBehavior />
      </body>
    </html>
  );
}
