import { motion } from "framer-motion";
import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ServicesItem from "./servicesItem";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface ServiceEdge {
  node: {
    _id: string;
    title: string;
    overview: string;
    images: {
      asset: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
}

interface ServicesProps {
  data: {
    hizmetlerimiz: {
      title: string;
      description: string;
      services: ServiceEdge[];
    };
  };
}

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, x: -90 },
  visible: { opacity: 1, x: 0 },
} as const;

const ANIMATION_CONFIG = {
  duration: 0.25,
  delay: 0.25,
} as const;

/**
 * Services component displays a carousel of services
 * @param {ServicesProps} props - Component props
 */
export default function Services({ data }: ServicesProps): JSX.Element {
  return (
    <motion.section
      variants={ANIMATION_VARIANTS}
      whileInView="visible"
      initial="hidden"
      viewport={{ once: true }}
      transition={ANIMATION_CONFIG}
      className="relative"
    >
      <div className="mt-0 md:mt-15">
        <div className="mx-auto max-w-7xl py-6 px-0 md:px-12">
          {/* Section Header */}
          <div className="px-5 md:px-0 mb-5">
            <span className="text-lg text-secondary font-bold">
              Hizmelerimiz
            </span>

            <div className="mt-4">
              <h2 className="text-2xl font-bold">
                {data?.hizmetlerimiz?.title}
              </h2>
              <p className="w-full md:w-1/2 text-secondary text-sm mt-3">
                {data?.hizmetlerimiz?.description}
              </p>
            </div>
          </div>

          {/* Services Carousel */}
          <div className="px-8 md:px-0 mb-0 md:mb-10">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={50}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              style={{
                padding: "15px 0px",
              }}
            >
              {data?.hizmetlerimiz?.services?.map((service) => {
                const firstImage = service.node.images?.asset;

                return (
                  <SwiperSlide key={service.node._id}>
                    <ServicesItem
                      data={{
                        img: firstImage,
                        name: service.node.title,
                        description: service.node.overview,
                      }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
