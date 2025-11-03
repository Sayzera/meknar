import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

interface SanityBlockContent {
  children: Array<{
    text: string;
  }>;
}

export interface AboutDescription {
  _key: string;
  _type: string;
  title: string;
  button_text: string;
  button_link: string;
  _rawDescription: SanityBlockContent[];
}

export interface AboutVideo {
  video_image: {
    asset: {
      url: string;
    };
  };
  _key: string;
  _type: string;
  title: string;
  video_link: string;
  _rawDescription: SanityBlockContent[];
}

export interface AboutNode {
  _id: string;
  description: AboutDescription;
  images: {
    asset: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  video: AboutVideo;
}

interface AboutDataQuery {
  allSanityAbout: {
    edges: Array<{
      node: AboutNode;
    }>;
  };
}

/**
 * Custom hook to fetch about page data from Sanity CMS
 * @returns {AboutDataQuery['allSanityAbout']} About page data including description, images, and video
 */
export default function useAboutData(): AboutDataQuery['allSanityAbout'] {
  const { allSanityAbout } = useStaticQuery<AboutDataQuery>(
    graphql`
      query AboutDataQuery {
        allSanityAbout {
          edges {
            node {
              _id
              description {
                _key
                _type
                title
                button_text
                button_link
                _rawDescription
              }
              images {
                asset {
                  gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                }
              }
              video {
                video_image {
                  asset {
                    url
                  }
                }
                _key
                _type
                title
                video_link
                _rawDescription
              }
            }
          }
        }
      }
    `
  );
  
  return allSanityAbout;
}
