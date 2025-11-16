import OurCoreValues from "@/components/about/our-core-values";
import FrequentlyAsked from "@/components/main/frequentlyAsked";
import PageHeader from "@/components/page-header";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import useAboutData from "@/hooks/useAboutData";
import useHomeData from "@/hooks/useHomeData";
import useSSSData from "@/hooks/useSSSData";
import { convertSanityBlockToHtml } from "@/lib/utils";
import { motion } from "framer-motion";
import { HeadFC, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ChevronRight } from "lucide-react";
import React, { useMemo } from "react";

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, x: -75 },
  visible: { opacity: 1, x: 0 },
} as const;

const ANIMATION_CONFIG = {
  duration: 0.25,
  delay: 0.25,
} as const;

/**
 * About page component
 */
export default function About(): JSX.Element {
  const homeData = useHomeData();
  const aboutData = useAboutData();
  const faqData = useSSSData();

  const data = aboutData?.edges?.[0]?.node;

  const descriptionHtml = useMemo(
    () => convertSanityBlockToHtml(data?.description?._rawDescription),
    [data?.description?._rawDescription]
  );

  const aboutImage = useMemo(
    () => getImage(data?.images?.asset),
    [data?.images]
  );

  if (!data) {
    // You cannot return null in a React.FC with a non-nullable return type (JSX.Element).
    // Let's render an empty fragment to satisfy type expectations.
    return <></>;
  }

  return (
    <>
      <PageHeader title="Hakkımızda" />
      <main>
        <div className="mx-auto max-w-7xl py-6 px-0 md:px-12">
          {/* About Section */}
          <motion.section
            variants={ANIMATION_VARIANTS}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            transition={ANIMATION_CONFIG}
            className="relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-10 px-6 items-start space-y-10 md:space-y-0">
              {/* About Image */}
              <div>
                {aboutImage && (
                  <GatsbyImage
                    image={aboutImage}
                    className="w-full h-full object-cover object-center rounded-lg"
                    alt={`${process.env.GATSBY_SITE_NAME} Hakkımızda`}
                  />
                )}
              </div>

              {/* About Content */}
              <div>
                <h1 className="text-5xl font-bold">
                  {data.description?.title}
                </h1>

                {descriptionHtml && (
                  <div
                    className="mt-5 text-secondary"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                  />
                )}

                {data.description?.button_link && (
                  <div className="mt-5">
                    <Link to={data.description.button_link}>
                      <Button variant="outline">
                        {data.description?.button_text}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.section>

          {/* About Video */}
          {/*
          data.video && <AboutVideo data={data.video} />*/}

          {/* Our Core Values */}
          <motion.section
            variants={{
              hidden: { opacity: 0, y: -75 },
              visible: { opacity: 1, y: 0 },
            }}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            transition={ANIMATION_CONFIG}
            className="relative"
          >
            <div className="px-6 mt-20">
              <OurCoreValues />
            </div>
          </motion.section>

          {/* Frequently Asked Questions */}
          <section className="mt-20">
            <FrequentlyAsked
              data={{
                sikca_sorulan_sorular: {
                  description:
                    homeData?.sikca_sorulan_sorular?.description || "",
                  title: homeData?.sikca_sorulan_sorular?.title || "",
                  sss: {
                    edges: faqData?.edges || [],
                  },
                },
              }}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export const Head: HeadFC = () => (
  <SEO title={`${process.env.GATSBY_SITE_NAME} | Hakkımızda`} />
);
