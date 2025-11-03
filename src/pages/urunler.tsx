import React, { useMemo, useState } from "react";

import PageHeader from "@/components/page-header";
import ProductItem from "@/components/products/productItem";
import { SEO } from "@/components/seo";
import useCategoriesData from "@/hooks/useCategoriesData";
import useProductsData from "@/hooks/useProductsData";
import { HeadFC, Link } from "gatsby";

type Props = {};
type Products = {
  edges: {
    node: {
      title: string;
      images: {
        asset: {
          gatsbyImageData: any;
        };
      }[];
      overview: {
        children: {
          text: string;
        }[];
      }[];
      slug: {
        current: string;
      };
      brand: string;
      category: {
        category_name: string;
        slug: {
          current: string;
        };
      };
    };
  }[];
};

export default function Products({}: Props) {
  const products: Products = useProductsData();
  const categories = useCategoriesData();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return products?.edges || [];
    }
    return (
      products?.edges?.filter(
        (product) => product.node.category?.slug?.current === selectedCategory
      ) || []
    );
  }, [products, selectedCategory]);

  return (
    <div>
      <main>
        <PageHeader title={"Ürünlerimiz"} />

        {/* Categories Section */}
        <div className="mx-auto max-w-7xl py-6 md:px-12">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800 px-4 md:px-0">
              Kategoriler
            </h2>
            <div className="overflow-x-auto scrollbar-hide px-4 md:px-0">
              <div className="flex md:flex-wrap gap-2 pb-2">
                {/* All Products Button */}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === null
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary border border-gray-200"
                  }`}
                >
                  Tüm Ürünler
                </button>

                {/* Category Buttons */}
                {categories?.edges?.map((category, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedCategory(category.node.slug.current)
                    }
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                      selectedCategory === category.node.slug.current
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary border border-gray-200"
                    }`}
                  >
                    {category.node.category_name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:space-y-0 gap-4 px-6 md:px-0">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => {
                return (
                  <Link
                    to={`/ankara-palet/${product.node.slug.current}`}
                    key={index}
                  >
                    <ProductItem
                      data={{
                        brand: product?.node?.brand,
                        img: product?.node?.images?.[0]?.asset || null,
                        name: product?.node?.title,
                        description:
                          (product?.node?.overview?.[0]?.children?.[0]?.text
                            ?.split(" ")
                            ?.slice(0, 20)
                            ?.join(" ") || "") + "...",
                      }}
                    />
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  Bu kategoride ürün bulunamadı.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export const Head: HeadFC = () => (
  <div>
    <SEO title={`${process.env.GATSBY_SITE_NAME} | Ürünlerimiz`}></SEO>
  </div>
);
