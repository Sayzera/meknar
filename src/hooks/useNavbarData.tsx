import { useStaticQuery, graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

export interface NavbarSettings {
  id: string;
  logo: {
    asset: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

interface NavbarDataQuery {
  sanitySettings: NavbarSettings;
}

/**
 * Custom hook to fetch navbar settings from Sanity CMS
 * @returns {NavbarSettings} Navbar configuration including logo
 */
export default function useNavbarData(): NavbarSettings {
  const { sanitySettings } = useStaticQuery<NavbarDataQuery>(
    graphql`
      query NavbarDataQuery {
        sanitySettings {
          id
          logo {
            asset {
              gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                width: 200
              )
            }
          }
        }
      }
    `
  );

  return sanitySettings;
}

