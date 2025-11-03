import { useStaticQuery, graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

interface SanityBlock {
  _key: string;
  _type: string;
  children: Array<{
    text: string;
  }>;
}

export interface ProductNode {
  id: string;
  rating: {
    _key: string;
    _type: string;
    rating: number;
    view_count: number;
  };
  _id: string;
  title: string;
  overview: SanityBlock[];
  seo_description: string;
  seo_keywords: string;
  seo_title: string;
  images: Array<{
    asset: {
      gatsbyImageData: IGatsbyImageData;
    };
  }>;
  sevkiyat: SanityBlock[];
  ozellikler: Array<{
    description: string;
    title: string;
  }>;
  slug: {
    current: string;
  };
  category: {
    category_name: string;
    slug: {
      current: string;
    };
  };
  brand: string;
}

interface ProductsDataQuery {
  allSanityProducts: {
    edges: Array<{
      node: ProductNode;
    }>;
  };
}

/**
 * Custom hook to fetch products data from Sanity CMS
 * Filters out products with option "5"
 * @returns {ProductsDataQuery['allSanityProducts']} Products data with images, descriptions, and metadata
 */
export default function useProductsData(): ProductsDataQuery['allSanityProducts'] {
  const { allSanityProducts } = useStaticQuery<ProductsDataQuery>(
    graphql`
    query ProductsDataQuery {
        allSanityProducts(filter: {product_options: {ne: "5"}}) {
          edges {
            node {
              id
              rating {
                _key
                _type
                rating
                view_count
              }
              _id
              title
              overview {
                ... on SanityBlock {
                  _key
                  _type
                  children {
                    text
                  }
                }
              }
              seo_description
              seo_keywords
              seo_title
              images {
                asset {
                  gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                }
              }
              sevkiyat {
                ... on SanityBlock {
                  _key
                  _type
                  children {
                    text
                  }
                }
              }
              ozellikler {
                description
                title
              }
              slug {
                current
              }
              category {
                category_name
                slug {
                  current
                }
              }
              brand
            }
          }
        }
      }
    `
  );

  return allSanityProducts;
}

