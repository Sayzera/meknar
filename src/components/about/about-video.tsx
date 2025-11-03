import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { PlayIcon } from "lucide-react";
import ReactPlayer from "react-player";
import video from "@/assets/background/video.mp4";
import { convertSanityBlockToHtml } from "@/lib/utils";

interface VideoImageAsset {
  asset: {
    url: string;
  };
}

interface SanityBlockContent {
  children: Array<{
    text: string;
  }>;
}

interface AboutVideoProps {
  data: {
    title: string;
    video_link: string;
    video_image: VideoImageAsset;
    _rawDescription: SanityBlockContent[];
  };
}

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, x: -75 },
  visible: { opacity: 1, x: 0 },
} as const;

const ANIMATION_CONFIG = {
  duration: 0.25,
  delay: 0.25,
} as const;

/**
 * AboutVideo component displays a video player with thumbnail overlay
 * @param {AboutVideoProps} props - Component props
 */
export default function AboutVideo({ data }: AboutVideoProps): JSX.Element {
  const [isOpenVideo, setIsOpenVideo] = useState<boolean>(false);

  const handlePlayVideo = useCallback(() => {
    setIsOpenVideo(true);
  }, []);

  const descriptionHtml = useMemo(
    () => convertSanityBlockToHtml(data?._rawDescription),
    [data?._rawDescription]
  );

  const videoImageUrl = data?.video_image?.asset?.url;

  return (
    <motion.div
      variants={ANIMATION_VARIANTS}
      whileInView="visible"
      initial="hidden"
      viewport={{ once: true }}
      transition={ANIMATION_CONFIG}
      className="relative"
    >
      <div className="px-6 mt-20">
        <div
          className="relative overflow-hidden rounded-md"
          style={{ paddingBottom: "56.25%" }}
        >
          {!isOpenVideo ? (
            <>
              {/* Video Thumbnail */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url(${videoImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                aria-label="Video thumbnail"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 w-full h-full bg-black/50"
                style={{ zIndex: 1 }}
              >
                <div className="flex flex-col items-center justify-center md:justify-between h-full py-10">
                  {/* Title */}
                  <h2 className="text-white text-4xl font-extrabold text-center hidden md:block">
                    {data?.title}
                  </h2>

                  {/* Play Button */}
                  <Button
                    onClick={handlePlayVideo}
                    variant="outlined"
                    color="warning"
                    aria-label="Play video"
                    sx={{
                      border: "3px solid #FA541B",
                    }}
                  >
                    <PlayIcon className="text-primary" />
                  </Button>

                  {/* Description */}
                  {descriptionHtml && (
                    <div className="md:flex justify-center hidden">
                      <div
                        className="w-1/2 text-white text-center"
                        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <ReactPlayer
              style={{ position: "absolute", top: 0, left: 0 }}
              url={video}
              playing
              loop
              width="100%"
              height="100%"
              controls
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
