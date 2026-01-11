import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

interface SanityBlock {
  _key: string;
  _type: string;
  title: string;
  description: string;
}

interface QuestionSection extends SanityBlock {
  button_text: string;
  button_link: string;
}

interface BannerSlogan {
  _key: string;
  _type: string;
  title: string;
  last_title: string;
}

export interface HomeNode {
  _id: string;
  _key: string;
  _rawHalaSorularinizMiVar: QuestionSection;
  _rawHizmetlerimiz: SanityBlock;
  _rawPaletlerimiz: SanityBlock;
  _rawHomeBannerSlogan: BannerSlogan;
  _rawSikcaSorulanSorular: SanityBlock;
  bannerImage: {
    asset: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  banner_description: string;
  button_phone: string;
  hala_sorulariniz_mi_var: QuestionSection;
  hizmetlerimiz: SanityBlock;
  home_banner_slogan: BannerSlogan;
  paletlerimiz: SanityBlock;
  sikca_sorulan_sorular: SanityBlock;
  product_titles: string[];
}

interface HomeDataQuery {
  allSanityHomePage: {
    edges: Array<{
      node: HomeNode;
    }>;
  };
}

/**
 * Custom hook to fetch home page data from Sanity CMS
 * @returns {HomeNode | undefined} Home page data or undefined if not available
 */
export default function useHomeData(): HomeNode | undefined {
  const { allSanityHomePage } = useStaticQuery<HomeDataQuery>(
    graphql`
      query HomeDataQuery {
        allSanityHomePage {
          edges {
            node {
              _id
              _key
              _rawHalaSorularinizMiVar
              _rawHizmetlerimiz
              _rawPaletlerimiz
              _rawHomeBannerSlogan
              _rawSikcaSorulanSorular
              bannerImage {
                asset {
                  gatsbyImageData(
                    layout: FULL_WIDTH
                    placeholder: BLURRED
                    sizes: "(max-width: 768px) 100vw, 1920px"
                  )
                }
              }
              banner_description
              button_phone
              hala_sorulariniz_mi_var {
                _key
                _type
                title
                description
                button_text
                button_link
              }
              hizmetlerimiz {
                _key
                _type
                title
                description
              }
              home_banner_slogan {
                _key
                _type
                title
                last_title
              }
              paletlerimiz {
                _key
                _type
                title
                description
              }
              sikca_sorulan_sorular {
                _key
                _type
                title
                description
              }
              product_titles
            }
          }
        }
      }
    `
  );

  return allSanityHomePage?.edges?.[0]?.node;
}
