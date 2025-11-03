import React from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";

import PageHeader from "@/components/page-header";
import { SEO } from "@/components/seo";
import useContactData from "@/hooks/useContactData";
import { HeadFC } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { CiClock2, CiMail } from "react-icons/ci";
import { IoPhonePortraitOutline } from "react-icons/io5";

type Props = {};
type contactNodeData = {
  work_hours: {
    title: string;
    work_hours: string;
  };
  mail: {
    title: string;
    mail: string;
  };
  geo_location: {
    latitude: number;
    longitude: number;
  };
  contact_phone: {
    title: string;
    phone: string;
  };
  contact_adress: {
    title: string;
    description: string;
  };
  contact_image: {
    asset: {
      gatsbyImageData: any;
    };
  };
};
interface ContactData {
  edges: {
    node: contactNodeData;
  }[];
}

export default function Contact({}: Props) {
  const contactData: ContactData = useContactData();
  const data: contactNodeData = contactData?.edges?.[0]?.node || {};

  return (
    <div>
      <main>
        <PageHeader title={"Bizimle İletişime Geçin"} />
        <div className="mx-auto max-w-7xl py-12 px-4 md:px-12 lg:py-16">
          {/* Hero Section with Image */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Size Nasıl Yardımcı Olabiliriz?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sorularınız, talepleriniz veya önerileriniz için bizimle iletişime
              geçebilirsiniz. Ekibimiz size en kısa sürede dönüş yapacaktır.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Image and Description */}
            <div className="space-y-8">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <GatsbyImage
                  image={getImage(data?.contact_image?.asset) as any}
                  className="w-full h-full"
                  alt={process.env.GATSBY_SITE_NAME}
                />
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Neden Bizi Tercih Etmelisiniz?
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary mr-3 text-xl">✓</span>
                    <span>Uzman ve deneyimli ekibimizle hizmetinizdeyiz</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 text-xl">✓</span>
                    <span>Hızlı ve güvenilir çözümler sunuyoruz</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 text-xl">✓</span>
                    <span>Müşteri memnuniyeti odaklı çalışıyoruz</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 text-xl">✓</span>
                    <span>7/24 destek ve danışmanlık hizmeti</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Contact Information Cards */}
            <div className="space-y-6">
              {/* Address Card */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary/30">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IoLocationOutline className="text-3xl text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {data.contact_adress?.title}
                      </h3>
                      <CiLocationArrow1 className="text-xl text-primary" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {data.contact_adress?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary/30 cursor-pointer"
                onClick={() => {
                  window.location.href = `tel:${data.contact_phone?.phone}`;
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IoPhonePortraitOutline className="text-3xl text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {data.contact_phone?.title}
                    </h3>
                    <p className="text-primary text-lg font-semibold group-hover:underline">
                      {data.contact_phone?.phone}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Hemen arayın, size yardımcı olalım
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary/30 cursor-pointer"
                onClick={() => {
                  window.location.href = `mailto:${data.mail?.mail}`;
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <CiMail className="text-3xl text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {data.mail?.title}
                    </h3>
                    <p className="text-primary text-lg font-semibold group-hover:underline break-all">
                      {data.mail?.mail}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Detaylı bilgi için mail gönderin
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary/30">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <CiClock2 className="text-3xl text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {data.work_hours?.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {data.work_hours?.work_hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Hemen İletişime Geçin
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Profesyonel ekibimiz size yardımcı olmak için hazır bekliyor
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`tel:${data.contact_phone?.phone}`}
                className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg inline-flex items-center space-x-2"
              >
                <IoPhonePortraitOutline className="text-xl" />
                <span>Hemen Ara</span>
              </a>
              <a
                href={`mailto:${data.mail?.mail}`}
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300 inline-flex items-center space-x-2"
              >
                <CiMail className="text-xl" />
                <span>Mail Gönder</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const Head: HeadFC = () => (
  <div>
    <SEO title={`${process.env.GATSBY_SITE_NAME} | İletişim`}></SEO>
  </div>
);
