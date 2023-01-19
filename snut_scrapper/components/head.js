import Heads from "next/head";

export default function Head({ title, description, kewords, url, image }) {
  return (
    <Heads>
      <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`dope, nsut, netaji, subhas, itsdope${kewords}`}
      />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <link rel="apple-touch-icon" href="/logo.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@id": "https://www.apple.com/#organization",
            "@type": "Organization",
            name: "Dope",
            url: "https://www.itsdope.in/",
            logo: "https://www.itsdope.in/logo.png",
            sameAs: [],
          }),
        }}
      />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={`https://www.itsdope.in/${url}`} />
      <meta
        property="og:image"
        content={image | "https://wwww.itsdope.in/logo.png"}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={image | "https://wwww.itsdope.in/logo.png"}
      />
      <meta name="twitter:card" content="summary_large_image" />
    </Heads>
  );
}
