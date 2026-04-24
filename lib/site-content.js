import fs from "fs";
import path from "path";

const PAGE_FILES = {
  "": "index.html",
  about: "about.html",
  services: "services.html",
  "who-we-serve": "who-we-serve.html",
  "case-studies": "case-studies.html",
  "meet-the-team": "meet-the-team.html",
  privacy: "privacy.html"
};

const ROUTE_REPLACEMENTS = [
  [/href="index\.html#([^"]+)"/g, 'href="/#$1"'],
  [/href="index\.html"/g, 'href="/"'],
  [/href="#top"/g, 'href="/#top"'],
  [/href="about\.html"/g, 'href="/about"'],
  [/href="services\.html"/g, 'href="/services"'],
  [/href="who-we-serve\.html"/g, 'href="/who-we-serve"'],
  [/href="case-studies\.html"/g, 'href="/case-studies"'],
  [/href="meet-the-team\.html"/g, 'href="/meet-the-team"'],
  [/href="privacy\.html"/g, 'href="/privacy"'],
  [/src="assets\//g, 'src="/assets/'],
  [/poster="assets\//g, 'poster="/assets/']
];

const TEXT_REPLACEMENTS = [
  [/\u00C2\u00A9/g, "\u00A9"],
  [/\u00E2\u20AC\u2122/g, "'"],
  [/\u00E2\u20AC\u0153/g, '"'],
  [/\u00E2\u20AC\u009D/g, '"'],
  [/\u00E2\u20AC\u201C/g, "-"],
  [/\u00E2\u20AC\u201D/g, "-"],
  [/\u00E2\u20AC\u00A6/g, "..."]
];

function getFilePath(slug) {
  const fileName = PAGE_FILES[slug];
  return fileName ? path.join(process.cwd(), fileName) : null;
}

function normalizeHtml(html) {
  let nextHtml = html;

  TEXT_REPLACEMENTS.forEach(([pattern, replacement]) => {
    nextHtml = nextHtml.replace(pattern, replacement);
  });

  ROUTE_REPLACEMENTS.forEach(([pattern, replacement]) => {
    nextHtml = nextHtml.replace(pattern, replacement);
  });

  nextHtml = nextHtml.replace(/<script\s+src="script\.js"><\/script>/gi, "");
  nextHtml = nextHtml.replace(/<link[^>]+rel="stylesheet"[^>]*>/gi, "");
  nextHtml = nextHtml.replace(/<link[^>]+fonts\.googleapis[^>]*>/gi, "");
  nextHtml = nextHtml.replace(/<link[^>]+fonts\.gstatic[^>]*>/gi, "");

  return nextHtml;
}

function extractTagContent(html, pattern, fallback = "") {
  const match = html.match(pattern);
  return match ? match[1].trim() : fallback;
}

export function isValidSlug(slug) {
  return Object.prototype.hasOwnProperty.call(PAGE_FILES, slug);
}

export function getAllSlugs() {
  return Object.keys(PAGE_FILES).filter(Boolean);
}

export function getPageContent(slug) {
  const filePath = getFilePath(slug);

  if (!filePath) {
    throw new Error(`Unknown slug: ${slug}`);
  }

  const rawHtml = fs.readFileSync(filePath, "utf8");
  const normalizedHtml = normalizeHtml(rawHtml);

  return {
    title: extractTagContent(normalizedHtml, /<title>([\s\S]*?)<\/title>/i),
    description: extractTagContent(
      normalizedHtml,
      /<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?>/i
    ),
    bodyHtml: extractTagContent(
      normalizedHtml,
      /<body[^>]*>([\s\S]*?)<\/body>/i
    )
  };
}

export function getPageMetadata(slug) {
  const { title, description } = getPageContent(slug);

  return {
    title: title.replace(/\s*\|\s*9 to 5 Office\s*$/i, "").trim(),
    description
  };
}
