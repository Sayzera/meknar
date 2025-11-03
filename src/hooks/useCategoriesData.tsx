import { graphql, useStaticQuery } from "gatsby";

export interface CategoryNode {
  id: string;
  _id: string;
  category_name: string;
  slug: {
    current: string;
  };
  image?: {
    asset: {
      gatsbyImageData: any;
    };
  };
}

interface CategoriesDataQuery {
  allSanityCategories: {
    edges: {
      node: CategoryNode;
    }[];
  };
}

/**
 * Custom hook to fetch categories data from Sanity CMS
 * @returns {CategoriesDataQuery['allSanityCategories']} Categories data with images and metadata
 */
export default function useCategoriesData(): CategoriesDataQuery["allSanityCategories"] {
  const { allSanityCategories } = useStaticQuery<CategoriesDataQuery>(
    graphql`
      query CategoriesDataQuery {
        allSanityCategories {
          edges {
            node {
              id
              _id
              category_name
              slug {
                current
              }
              image {
                asset {
                  gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                }
              }
            }
          }
        }
      }
    `
  );

  return allSanityCategories;
}
