import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface ServicesItemProps {
  data: {
    img?: {
      gatsbyImageData?: IGatsbyImageData;
    };
    name?: string;
    description?: string;
  };
}

/**
 * ServicesItem component displays a service card with image and description
 * @param {ServicesItemProps} props - Component props
 */
export default function ServicesItem({ data }: ServicesItemProps): JSX.Element {
  const image = data.img ? getImage(data.img) : null;
  const serviceName = data.name || process.env.GATSBY_SITE_NAME;
  return (
    <article className="mx-auto mt-11 transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      {/* Service Image */}
      <div className="md:h-58">
        {image ? (
          <GatsbyImage
            image={image}
            alt={serviceName || "Service"}
            className="object-cover object-center md:!h-[300px] md:w-full"
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-100 h-[300px] w-full">
            <span className="text-gray-400 text-sm">Görsel Yok</span>
          </div>
        )}
      </div>

      {/* Service Details */}
      <div className="p-4 min-h-[150px] overflow-hidden">
        <h2 className="mb-2 text-lg font-medium text-primary">{serviceName}</h2>
        {data.description && (
          <p className="mb-2 text-sm text-secondary">{data.description}</p>
        )}
      </div>
    </article>
  );
}
