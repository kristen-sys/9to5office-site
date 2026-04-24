import { getPageContent, getPageMetadata } from "../lib/site-content";

export const metadata = getPageMetadata("");

export default function HomePage() {
  const { bodyHtml } = getPageContent("");

  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
