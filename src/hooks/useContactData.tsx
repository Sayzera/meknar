import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

export interface WorkHoursDay {
  day: string;
  start_time?: string;
  end_time?: string;
  is_closed: boolean;
}

export interface ContactNode {
  work_hours: {
    title: string;
    days?: WorkHoursDay[];
  };
  mail: {
    title: string;
    mail: string;
  };
  geo_location: {
    latitude: number;
    longitude: number;
  };
  contact_phone: {
    title: string;
    phone: string;
  };
  contact_adress: {
    title: string;
    description: string;
  };
  contact_image: {
    asset: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

interface ContactDataQuery {
  allSanityContact: {
    edges: Array<{
      node: ContactNode;
    }>;
  };
}

/**
 * Custom hook to fetch contact page data from Sanity CMS
 * @returns {ContactDataQuery['allSanityContact']} Contact information including phone, address, working hours, etc.
 */
export default function useContactData(): ContactDataQuery["allSanityContact"] {
  const { allSanityContact } = useStaticQuery<ContactDataQuery>(
    graphql`
      query ContactDataQuery {
        allSanityContact {
          edges {
            node {
              work_hours {
                title
                days {
                  day
                  start_time
                  end_time
                  is_closed
                }
              }
              mail {
                title
                mail
              }
              geo_location {
                latitude
                longitude
              }
              contact_phone {
                title
                phone
              }
              contact_adress {
                title
                description
              }
              contact_image {
                asset {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    placeholder: BLURRED
                    formats: WEBP
                  )
                }
              }
            }
          }
        }
      }
    `
  );

  return allSanityContact;
}
