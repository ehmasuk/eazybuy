"use client";

import ProductHeroSection from "@/components/ProductHeroSection";
import ProductReviews from "@/components/ProductReviews";
import { Skeleton } from "antd";
import { redirect } from "next/navigation";
import useSWR from "swr";
function ProductDetails({ params }) {
  const { data: product, error, isLoading } = useSWR(`/singleproduct?slug=${params.slug}`);

  if (isLoading) {
    return (
      <div className="max-w-7xl px-4 py-10 mx-auto grid lg:grid-cols-4 gap-5 md:grid-cols-2 lg:gap-10 grid-cols-1">
        {[...Array(10)].map((_, index) => {
          return <Skeleton key={index} active />;
        })}
      </div>
    );
  }

  if (error) return redirect("/404");

  return (
    <div className="max-w-7xl px-4 py-10 mx-auto">
      <ProductHeroSection product={product} />
      <div className="py-10">
        <p className="text-3xl my-3">Product description</p>
        <div className="leading-loose tracking-wide">{product?.description}</div>
      </div>
      <ProductReviews product={product} />
    </div>
  );
}

export default ProductDetails;
