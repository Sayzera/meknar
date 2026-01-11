import { Button } from "@/components/ui/button";
import { formatPhoneForLink, navigateToExternal } from "@/lib/utils";
import { motion } from "framer-motion";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SlCallOut } from "react-icons/sl";

interface BannerProps {
  data: {
    home_banner_slogan: {
      title: string;
      last_title: string;
    };
    bannerImage: {
      asset: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    product_titles: string[];
    banner_description: string;
    button_phone: string;
  };
}

const MOBILE_BREAKPOINT = 768;

/**
 * Banner component displays hero section with banner image background
 * @param {BannerProps} props - Component props
 */
export default function Banner({ data }: BannerProps): JSX.Element {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePhoneClick = useCallback(() => {
    const phoneNumber = formatPhoneForLink(data.button_phone);
    navigateToExternal(`tel:${phoneNumber}`);
  }, [data.button_phone]);

  const bannerImage = useMemo(
    () => getImage(data.bannerImage?.asset),
    [data.bannerImage?.asset]
  );

  return (
    <section className="relative h-[500px] md:h-[600px]">
      {/* Banner Image Background */}
      {bannerImage && (
        <GatsbyImage
          image={bannerImage}
          className="absolute inset-0 w-full h-full"
          alt={process.env.GATSBY_SITE_NAME || "Banner"}
          imgStyle={{
            objectFit: "cover",
            objectPosition: "center center",
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gray-900 opacity-50" />

      {/* Content */}
      <div className="absolute inset-0 flex justify-center">
        <div className="mt-2 md:mt-12">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 justify-center md:justify-start md:grid-cols-1">
              {/* Text Content */}
              <div>
                {/* Title */}
                <motion.div
                  animate={{ x: [-100, 0, 0] }}
                  transition={{ duration: 2 }}
                >
                  <h1 className="text-xl leading-9 md:text-6xl font-extrabold md:leading-[4.25rem] text-white md:text-start px-10 md:px-0 drop-shadow-[0_4px_12px_rgba(0,0,0,1)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_100%)]">
                    {data?.home_banner_slogan?.title}{" "}
                    <span className="text-amber-400 drop-shadow-[0_4px_12px_rgba(0,0,0,1)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_100%)] underline decoration-4 md:decoration-[6px] decoration-amber-400 underline-offset-4 md:underline-offset-8">
                      {data?.home_banner_slogan?.last_title}
                    </span>
                  </h1>
                </motion.div>

                <div className="flex flex-col px-10 md:px-0">
                  {/* Description */}
                  <p className="mt-4 md:mt-8 text-white font-semibold text-base md:text-xl drop-shadow-[0_3px_10px_rgba(0,0,0,1)] [text-shadow:_1px_1px_6px_rgb(0_0_0_/_100%)]">
                    {data.banner_description}
                  </p>

                  {/* CTA Button */}
                  <div className="mt-6 flex md:justify-start">
                    <motion.div
                      initial={{ opacity: 0.6 }}
                      whileHover={{
                        scale: 1.2,
                        transition: { duration: 1 },
                      }}
                      whileTap={{ scale: 0.9 }}
                      whileInView={{ opacity: 1 }}
                    >
                      <Button
                        variant="outline"
                        onClick={handlePhoneClick}
                        aria-label="Fiyat bilgisi almak için ara"
                      >
                        <span className="text-sm">Fiyat Bilgisi Al</span>
                        <SlCallOut className="ml-2 w-4 h-4 text-primary" />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Product Titles */}
                  {data?.product_titles && data.product_titles.length > 0 && (
                    <div className="mt-4 md:mt-8 text-white">
                      <span className="text-inherit text-xl md:text-2xl text-amber-400  font-bold drop-shadow-[0_3px_10px_rgba(0,0,0,1)] [text-shadow:_1px_1px_6px_rgb(0_0_0_/_100%)]">
                        Ürünler
                      </span>
                      <ul className="flex space-x-4 mt-1">
                        {data.product_titles.map((item, index) => (
                          <li
                            key={`${item}-${index}`}
                            className="text-white text-sm md:text-xl font-semibold drop-shadow-[0_3px_10px_rgba(0,0,0,1)] [text-shadow:_1px_1px_6px_rgb(0_0_0_/_100%)]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
