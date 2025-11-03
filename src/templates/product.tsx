import InteractiveList from "@/components/list";
import PageHeader from "@/components/page-header";
import BasicRating from "@/components/rating";
import { Badge } from "@/components/ui/badge";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { Link } from "gatsby";
import React from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import { SEO } from "@/components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "yet-another-react-lightbox/plugins/counter.css";

type Props = {
  pageContext: {
    productData: {
      category: {
        category_name: string;
      };
      id: string;
      images: {
        asset: {
          gatsbyImageData: {
            images: {
              fallback: {
                src: string;
              };
            };
          };
        };
      }[];
      overview: PortableTextBlock[];
      ozellikler: {
        description: string;
        title: string;
      }[];
      seo_description: string;
      seo_keywords: string;
      seo_title: string;
      title: string;
      slug: {
        current: string;
      };
      rating: {
        rating: number;
        view_count: number;
      };
    };
    productPath: string;
  };
};

export default function ProductDetail({ pageContext }: Props) {
  const [openLightbox, setOpenLightbox] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const fullscreenRef = React.useRef(null);
  const [productImages, setProductImages] = React.useState<
    {
      src: string;
    }[]
  >();
  const { productData, productPath } = pageContext;

  console.log(productData.overview);

  React.useEffect(() => {
    if (productData.images && productData.images.length > 0) {
      const images = productData.images
        .map((image) => {
          return {
            src: image?.asset?.gatsbyImageData?.images?.fallback?.src || "",
          };
        })
        .filter((img) => img.src); // Remove images without src
      setProductImages(images);
    }
  }, [productData]);

  const serializers = {
    types: {
      block(props: any) {
        switch (props.node.style) {
          case "h1":
            return <h1 className="text-center">{props.children}</h1>;
          case "h2":
            return <h2 className="text-center">{props.children}</h2>;
          case "h3":
            return <h3 className="text-center">{props.children}</h3>;
          case "h4":
            return <h4 className="text-center">{props.children}</h4>;
          case "blockquote":
            return <blockquote>{props.children}</blockquote>;
          default:
            return <p className="inspirationText">{props.children}</p>;
        }
      },
    },
    marks: {
      internalLink: ({
        mark,
        children,
      }: {
        mark: any;
        children: React.ReactNode;
      }) => {
        const { slug = {} } = mark;
        const href = `/${slug.current}`;
        return <Link to={href}>{children}</Link>;
      },
      externalLink: ({
        mark,
        children,
      }: {
        mark: any;
        children: React.ReactNode;
      }) => {
        const { blank, href } = mark;
        return blank ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ) : (
          <a href={href}>{children}</a>
        );
      },
    },
  };
  return (
    <div>
      <Lightbox
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
        open={openLightbox}
        plugins={[Fullscreen, Zoom, Slideshow, Counter]}
        fullscreen={{ ref: fullscreenRef }}
        controller={{
          closeOnBackdropClick: true,
        }}
        index={index}
        on={{
          view: ({ index: currentIndex }) => setIndex(currentIndex),
          click(props) {
            console.log(props);
          },
        }}
        // resim dışında bir yere tıklayınca kapat

        close={() => setOpenLightbox(false)}
        slides={productImages}
      />
      <PageHeader title={productData.title} />
      <div className="mx-auto max-w-7xl py-6 px-0 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-10 min-h-[645px] ">
          <div>
            {productData.images &&
            productData.images.length > 0 &&
            productData.images[0]?.asset ? (
              <>
                <div
                  className="rounded-lg flex items-center"
                  onClick={() => setOpenLightbox(true)}
                >
                  <div
                    onClick={() => {
                      setIndex(0);
                      setOpenLightbox(true);
                    }}
                    className="max-h-[500px]"
                  >
                    <GatsbyImage
                      image={getImage(productData.images[0].asset) as any}
                      alt={productData.title}
                      className="max-h-[500px] w-full"
                      imgStyle={{ objectFit: "contain", maxHeight: "500px" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex space-x-2 px-6">
                    {productData.images.map(
                      (image, index) =>
                        image?.asset && (
                          <div
                            key={index}
                            onClick={() => {
                              setIndex(index);
                              setOpenLightbox(true);
                            }}
                          >
                            <GatsbyImage
                              image={getImage(image.asset) as any}
                              className="h-16 w-16 border border-gray cursor-pointer transition ease-in-out delay-150 hover:scale-125"
                              alt={productData.title}
                            />
                          </div>
                        )
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-lg flex items-center justify-center bg-gray-100 h-96">
                <p className="text-gray-500">Ürün görseli mevcut değil</p>
              </div>
            )}
          </div>
          <div className="bg-white mx-3 md:mx-0 p-5 rounded-lg shadow-lg">
            <Badge variant="default">Stokta Var</Badge>

            <div className="mt-5">
              <div>
                <span className="text-xl font-bold">{productData.title}</span>
              </div>
              <div className="mt-3">
                <div className="relative w-fit ">
                  <BasicRating count={productData.rating.rating} />
                  <div className="absolute top-[6px] -right-[93px] flex items-center space-x-1 text-gray-500">
                    <span className="text-[10px] text-gray-500">
                      ({productData.rating.view_count} kişi inceledi)
                    </span>
                  </div>
                </div>

                <div>
                  <InteractiveList properties={productData.ozellikler} />
                </div>

                <div>
                  <p className="mt-4 text-sm leading-6 text-secondary">
                    <PortableText value={productData.overview} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Head = (props: Props) => {
  let data = props.pageContext.productData;
  let path = props.pageContext.productPath;

  const productImage =
    data.images?.[0]?.asset?.gatsbyImageData?.images?.fallback?.src;

  return (
    <SEO
      title={`${process.env.GATSBY_SITE_NAME} | ${data.title}`}
      description={data.seo_description}
      pathname={path}
      productImage={productImage}
    ></SEO>
  );
};
