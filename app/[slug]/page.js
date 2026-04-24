import { notFound } from "next/navigation";
import { getAllSlugs, getPageContent, getPageMetadata, isValidSlug } from "../../lib/site-content";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  if (!isValidSlug(params.slug)) {
    return {};
  }

  return getPageMetadata(params.slug);
}

export default function SitePage({ params }) {
  if (!isValidSlug(params.slug)) {
    notFound();
  }

  const { bodyHtml } = getPageContent(params.slug);

  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
