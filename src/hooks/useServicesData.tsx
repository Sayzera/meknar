import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

export interface ServiceNode {
  _id: string;
  images: {
    asset: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  title: string;
  overview?: any;
}

interface ServicesDataQuery {
  allSanityServices: {
    edges: Array<{
      node: ServiceNode;
    }>;
  };
}

/**
 * Custom hook to fetch services data from Sanity CMS
 * @returns {ServicesDataQuery['allSanityServices']} Services data with images and descriptions
 */
export default function useServicesData(): ServicesDataQuery["allSanityServices"] {
  const { allSanityServices } = useStaticQuery<ServicesDataQuery>(
    graphql`
      query ServicesDataQuery {
        allSanityServices {
          edges {
            node {
              _id
              images {
                asset {
                  gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                }
              }
              title
              overview {
                ... on SanityBlock {
                  _key
                  _type
                  children {
                    _key
                    _type
                    marks
                    text
                  }
                  style
                  listItem
                  level
                }
              }
            }
          }
        }
      }
    `
  );

  return allSanityServices;
}
