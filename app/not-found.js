export default function NotFoundPage() {
  return (
    <main className="hero hero-inner">
      <div className="container">
        <div className="section-heading reveal reveal-visible">
          <p className="eyebrow">Not Found</p>
          <h1 className="page-title">That page does not exist.</h1>
          <p className="hero-text">
            Head back to the homepage to keep exploring the site.
          </p>
          <div className="hero-actions">
            <a className="button" href="/">
              Return Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
