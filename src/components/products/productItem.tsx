import { Badge } from "@/components/ui/badge";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface ProductItemProps {
  data: {
    img: {
      gatsbyImageData: IGatsbyImageData;
    } | null;
    name?: string;
    description?: string;
    brand?: string;
  };
}

/**
 * ProductItem component displays a product card with image, name, description, and brand
 * @param {ProductItemProps} props - Component props
 */
export default function ProductItem({ data }: ProductItemProps): JSX.Element {
  const image = data.img ? getImage(data.img) : null;
  const productName = data.name || process.env.GATSBY_SITE_NAME;

  return (
    <article className="mx-auto mt-11 transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      {/* Product Image */}
      <div className="relative h-[250px] md:h-[300px] overflow-hidden">
        {image ? (
          <GatsbyImage
            image={image}
            alt={productName || ""}
            className="!h-full w-full"
            imgStyle={{ objectFit: "contain" }}
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-100 h-full w-full">
            <span className="text-gray-400 text-sm">Görsel Yok</span>
          </div>
        )}

        {/* Brand Badge */}
        {data.brand && (
          <Badge className="absolute top-1 right-1 text-xxs text-white">
            {data.brand}
          </Badge>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 min-h-[150px] overflow-hidden">
        <h2 className="mb-2 text-lg font-medium text-primary">{productName}</h2>
        {data.description && (
          <p className="mb-2 text-sm text-secondary">{data.description}</p>
        )}
      </div>
    </article>
  );
}
