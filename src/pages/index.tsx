import Banner from "@/components/main/banner";
import FrequentlyAsked from "@/components/main/frequentlyAsked";
import SecondSection from "@/components/main/second-section";
import Services from "@/components/main/services";
import StilHaveQuestion from "@/components/main/stilHaveQuestion";
import { SEO } from "@/components/seo";
import useHomeData from "@/hooks/useHomeData";
import useProductsData from "@/hooks/useProductsData";
import useServicesData from "@/hooks/useServicesData";
import useSSSData from "@/hooks/useSSSData";
import type { HeadFC, PageProps } from "gatsby";
import React from "react";

/**
 * Home page component
 */
const IndexPage: React.FC<PageProps> = () => {
  const homeData = useHomeData();
  const productsData = useProductsData();
  const servicesData = useServicesData();

  const faqData = useSSSData();

  if (!homeData) {
    return null;
  }

  return (
    <main>
      <Banner
        data={{
          bannerImage: homeData.bannerImage,
          home_banner_slogan: homeData.home_banner_slogan,
          banner_description: homeData.banner_description,
          button_phone: homeData.button_phone,
          product_titles: homeData.product_titles,
        }}
      />

      <div className="banner-container">
        <SecondSection
          data={{
            paletlerimiz: {
              title: homeData.paletlerimiz?.title || "",
              description: homeData.paletlerimiz?.description || "",
            },
            products: productsData?.edges || [],
          }}
        />

        <Services
          data={{
            hizmetlerimiz: {
              description: homeData.hizmetlerimiz?.description || "",
              title: homeData.hizmetlerimiz?.title || "",
              services: servicesData?.edges || [],
            },
          }}
        />

        <FrequentlyAsked
          data={{
            sikca_sorulan_sorular: {
              description: homeData.sikca_sorulan_sorular?.description || "",
              title: homeData.sikca_sorulan_sorular?.title || "",
              sss: {
                edges: faqData?.edges || [],
              },
            },
          }}
        />

        <StilHaveQuestion
          data={{
            hala_sorulariniz_mi_var: {
              button_link: homeData._rawHalaSorularinizMiVar?.button_link || "",
              button_text: homeData._rawHalaSorularinizMiVar?.button_text || "",
              description: homeData._rawHalaSorularinizMiVar?.description || "",
              title: homeData._rawHalaSorularinizMiVar?.title || "",
            },
          }}
        />
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <SEO title={`${process.env.GATSBY_SITE_NAME} | Anasayfa`} />
);
