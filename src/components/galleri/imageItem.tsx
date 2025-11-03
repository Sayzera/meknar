import { Badge } from "@/components/ui/badge";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useCallback } from "react";

interface ImageItemProps {
  setOpenLightbox: (value: boolean) => void;
  setIndex: (value: number) => void;
  index: number;
  data: {
    images: {
      asset: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    _rawImages: {
      alt: string;
    };
    overview: string;
    brand: string;
    id: string;
  };
}

/**
 * ImageItem component displays a gallery image with overlay and lightbox functionality
 * @param {ImageItemProps} props - Component props
 */
export default function ImageItem({
  setOpenLightbox,
  data,
  setIndex,
  index,
}: ImageItemProps): JSX.Element {
  const image = getImage(data?.images.asset);
  const altText = `${data?._rawImages.alt} ${process.env.GATSBY_SITE_NAME}`;

  const handleClick = useCallback(() => {
    setIndex(index);
    setOpenLightbox(true);
  }, [index, setIndex, setOpenLightbox]);

  return (
    <button
      type="button"
      className="relative inline-block group/text-image cursor-pointer w-full aspect-square overflow-hidden bg-gray-100"
      onClick={handleClick}
      aria-label={`View ${altText} in lightbox`}
    >
      {/* Gallery Image */}
      {image && (
        <div className="w-full h-full flex items-center justify-center">
          <GatsbyImage
            image={image}
            className="max-w-full max-h-full"
            alt={altText}
            objectFit="contain"
            imgStyle={{
              objectFit: "contain",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </div>
      )}

      {/* Overlay with Description */}
      {data?.overview && (
        <div className="hidden absolute bottom-0 left-0 bg-black/50 px-4 py-2 rounded w-full text-white group-hover/text-image:block transition-all duration-300 ease-in-out text-md">
          {data.overview}
        </div>
      )}

      {/* Brand Badge */}
      {data?.brand && (
        <Badge className="absolute top-1 right-1 text-xxs text-white">
          {data.brand}
        </Badge>
      )}
    </button>
  );
}
