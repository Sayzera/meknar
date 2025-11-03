import ImageItem from "@/components/galleri/imageItem";
import PageHeader from "@/components/page-header";
import { SEO } from "@/components/seo";
import useGalleryData from "@/hooks/useGalleryData";
import { HeadFC } from "gatsby";
import React, { useCallback, useMemo, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

interface LightboxSlide {
  src: string;
}

/**
 * Gallery page component displaying project images with lightbox functionality
 */
export default function Galeri(): JSX.Element {
  console.log(process.env, "process.env.GATSBY_SITE_NAME");
  const galleryData = useGalleryData();
  const [openLightbox, setOpenLightbox] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const fullscreenRef = useRef(null);
  const thumbnailsRef = useRef(null);

  const images = useMemo<LightboxSlide[]>(() => {
    if (!galleryData?.edges) {
      return [];
    }

    return galleryData.edges
      .map((item) => {
        const fallbackSrc =
          item?.node?.images?.asset?.gatsbyImageData?.images?.fallback?.src;
        if (!fallbackSrc) return null;
        return { src: fallbackSrc };
      })
      .filter((img): img is LightboxSlide => img !== null);
  }, [galleryData]);

  const handleCloseLightbox = useCallback(() => {
    setOpenLightbox(false);
  }, []);

  const handleViewChange = useCallback(
    ({ index: currentIndex }: { index: number }) => {
      setIndex(currentIndex);
    },
    []
  );

  return (
    <>
      <Lightbox
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
        open={openLightbox}
        thumbnails={{ ref: thumbnailsRef }}
        plugins={[Fullscreen, Zoom, Slideshow, Counter, Thumbnails]}
        fullscreen={{ ref: fullscreenRef }}
        controller={{
          closeOnBackdropClick: true,
        }}
        index={index}
        on={{
          view: handleViewChange,
        }}
        close={handleCloseLightbox}
        slides={images}
      />

      <PageHeader title="Yaptığımız İşler" />

      <main>
        <div className="mx-auto max-w-7xl py-6 px-0 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 md:px-0 gap-6 px-6">
            {galleryData?.edges?.map((item, itemIndex) => (
              <ImageItem
                key={item.node.id}
                data={item.node}
                setOpenLightbox={setOpenLightbox}
                setIndex={setIndex}
                index={itemIndex}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export const Head: HeadFC = () => (
  <SEO title={`${process.env.GATSBY_SITE_NAME} | Galeri`} />
);
