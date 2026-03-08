import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import InteractiveList from "../list";
import BasicRating from "../rating";

interface ozellik {
  description: string;
  title: string;
}
type Props = {
  product: {
    rating: {
      rating: number;
      view_count: number;
    };
    title: string;
    description: string;
    overview: {
      children: {
        text: string;
      }[];
    }[];
    images: {
      asset: any;
    };
    ozellikler: ozellik[];
    category: {
      category_name: string;
    };
  };
};

export default function ProductDetail({ product }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  min-h-[645px] ">
      <div className="w-full h-full min-h-[645px] overflow-hidden bg-white flex items-center justify-center rounded-lg">
        <GatsbyImage
          image={getImage(product.images[0].asset) as any}
          alt={process.env.GATSBY_SITE_NAME}
          placeholder={"blurred" as any}
          imgClassName="object-contain !w-full !h-full"
        />
      </div>
      <div className="bg-white mx-3 md:mx-0 p-5">
        <div className="mt-5">
          <div>
            <span className="text-xl font-bold">{product.title}</span>
          </div>
          <div className="mt-3">
            <div className="relative w-fit ">
              <BasicRating count={product.rating.rating} />
              <div className="absolute top-[6px] -right-[93px] flex items-center space-x-1 text-gray-500">
                <span className="text-[10px] text-gray-500">
                  ({product.rating.view_count} kişi inceledi)
                </span>
              </div>
            </div>

            <div>
              <p className="mt-4 text-sm leading-6 text-secondary">
                {product.overview?.[0].children[0].text}
              </p>
            </div>

            <div className="max-h-[400px] overflow-y-scroll [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-400">
              <InteractiveList properties={product?.ozellikler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
