import { useStaticQuery, graphql } from "gatsby";

export interface SSSNode {
  _id: string;
  answer: string;
  question: string;
}

interface SSSDataQuery {
  allSanitySss: {
    edges: Array<{
      node: SSSNode;
    }>;
  };
}

/**
 * Custom hook to fetch FAQ (Sık Sorulan Sorular) data from Sanity CMS
 * @returns {SSSDataQuery['allSanitySss']} FAQ questions and answers
 */
export default function useSSSData(): SSSDataQuery['allSanitySss'] {
  const { allSanitySss } = useStaticQuery<SSSDataQuery>(
    graphql`
    query SSSDataQuery {
      allSanitySss {
        edges {
          node {
            _id
            answer
            question
          }
        }
      }
    }
    `
  );

  return allSanitySss;
}

