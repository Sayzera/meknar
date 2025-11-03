import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "@/hooks/use-site-metadata";

interface SEOProps {
  title?: string;
  description?: string;
  pathname?: string;
  productImage?: string;
  children?: React.ReactNode;
}

interface SEOData {
  title: string;
  description: string;
  image: string;
  url: string;
  twitterUsername: string;
}

/**
 * SEO component for managing meta tags and page metadata
 * @param {SEOProps} props - Component props
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  pathname,
  children,
  productImage,
}) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
    twitterUsername,
  } = useSiteMetadata();

  const seo: SEOData = useMemo(
    () => ({
      title: title || defaultTitle,
      description: description || defaultDescription,
      image: productImage || `${siteUrl}${image}`,
      url: `${siteUrl}${pathname || ""}`,
      twitterUsername,
    }),
    [
      title,
      defaultTitle,
      description,
      defaultDescription,
      productImage,
      siteUrl,
      image,
      pathname,
      twitterUsername,
    ]
  );

  return (
    <Helmet>
      {/* HTML Attributes */}
      <html lang="tr" />

      {/* Basic Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      {/* Favicon */}
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      />

      {/* Page Title */}
      <title>{seo.title}</title>

      {/* Additional Children */}
      {children}
    </Helmet>
  );
};
