import { graphql, useStaticQuery } from "gatsby";

export interface HeaderSettings {
  id: string;
  phone: string;
  address: string;
  discount_text: string;
  facebook: string;
  fax: string;
  google_maps: string;
  instagram: string;
  short_description: string;
  twitter: string;
  youtube: string;
  mail: string;
  logo: {
    asset: {
      url: string;
    };
  };
}

interface HeaderDataQuery {
  sanitySettings: HeaderSettings;
}

/**
 * Custom hook to fetch header/footer settings from Sanity CMS
 * @returns {HeaderSettings} Site settings including contact info, social media links, etc.
 */
export default function useHeaderData(): HeaderSettings {
  const { sanitySettings } = useStaticQuery<HeaderDataQuery>(
    graphql`
      query HeaderDataQuery {
        sanitySettings {
          id
          phone
          address
          discount_text
          facebook
          fax
          google_maps
          instagram
          short_description
          twitter
          youtube
          mail
          logo {
            asset {
              url
            }
          }
        }
      }
    `
  );

  return sanitySettings;
}
