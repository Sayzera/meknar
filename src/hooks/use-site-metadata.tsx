import { graphql, useStaticQuery } from "gatsby";

export interface SiteMetadata {
  title: string;
  description: string;
  twitterUsername: string;
  image: string;
  siteUrl: string;
}

interface SiteMetadataQuery {
  site: {
    siteMetadata: SiteMetadata;
  };
}

/**
 * Custom hook to fetch site metadata from Gatsby config
 * @returns {SiteMetadata} Site metadata including title, description, social info, etc.
 */
export const useSiteMetadata = (): SiteMetadata => {
  const data = useStaticQuery<SiteMetadataQuery>(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
          description
          twitterUsername
          image
          siteUrl
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
