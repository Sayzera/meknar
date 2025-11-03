import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

export interface GalleryNode {
  images: {
    asset: {
      gatsbyImageData: IGatsbyImageData;
      altText: string;
    };
  };
  _rawImages: {
    alt: string;
  };
  overview: string;
  brand: string;
  id: string;
}

interface GalleryDataQuery {
  allSanityGalleri: {
    edges: Array<{
      node: GalleryNode;
    }>;
  };
}

/**
 * Custom hook to fetch gallery data from Sanity CMS
 * @returns {GalleryDataQuery['allSanityGalleri']} Gallery images with metadata
 */
export default function useGalleryData(): GalleryDataQuery["allSanityGalleri"] {
  const { allSanityGalleri } = useStaticQuery<GalleryDataQuery>(
    graphql`
      query GalleryDataQuery {
        allSanityGalleri {
          edges {
            node {
              images {
                asset {
                  gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                  altText
                }
              }
              _rawImages
              overview
              brand
              id
            }
          }
        }
      }
    `
  );

  return allSanityGalleri;
}
