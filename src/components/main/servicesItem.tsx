import { PortableText } from "@portabletext/react";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface ServicesItemProps {
  data: {
    img?: {
      gatsbyImageData?: IGatsbyImageData;
    };
    name?: string;
    description?: any;
  };
}

/**
 * ServicesItem component displays a service card with image and description
 * @param {ServicesItemProps} props - Component props
 */
export default function ServicesItem({ data }: ServicesItemProps): JSX.Element {
  const image = data.img ? getImage(data.img) : null;
  const serviceName = data.name || process.env.GATSBY_SITE_NAME;

  // description artık sadece _rawOverview (block content array)
  const portableTextValue = data.description;

  console.log(data, "data");

  return (
    <article className="mx-auto mt-11 transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg flex flex-col h-[550px]">
      {/* Service Image */}
      <div className="h-[300px] flex-shrink-0">
        {image ? (
          <GatsbyImage
            image={image}
            alt={serviceName || "Service"}
            className="object-cover object-center !h-full w-full"
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-100 h-full w-full">
            <span className="text-gray-400 text-sm">Görsel Yok</span>
          </div>
        )}
      </div>

      {/* Service Details */}
      <div className="p-4 flex-1 flex flex-col overflow-hidden">
        <h2 className="mb-2 text-lg font-medium text-primary flex-shrink-0">
          {serviceName}
        </h2>
        {portableTextValue && (
          <div className="text-sm text-secondary leading-relaxed overflow-y-auto flex-1">
            <PortableText
              value={portableTextValue}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-2">{children}</p>,
                  h1: ({ children }) => (
                    <h1 className="text-xl font-bold mb-2">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg font-bold mb-2">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-bold mb-2">{children}</h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic my-2">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  underline: ({ children }) => (
                    <span className="underline">{children}</span>
                  ),
                  link: ({ value, children }) => {
                    const target = (value?.href || "").startsWith("http")
                      ? "_blank"
                      : undefined;
                    return (
                      <a
                        href={value?.href}
                        target={target}
                        rel={
                          target === "_blank"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-primary hover:underline"
                      >
                        {children}
                      </a>
                    );
                  },
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc list-inside mb-2 ml-2">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal list-inside mb-2 ml-2">
                      {children}
                    </ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="mb-1">{children}</li>
                  ),
                  number: ({ children }) => (
                    <li className="mb-1">{children}</li>
                  ),
                },
              }}
            />
          </div>
        )}
      </div>
    </article>
  );
}
