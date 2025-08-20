"use client";

import CategoryCards from "@/components/CategoryCards";
import HeroSlider from "@/components/HeroSlider";
import NewsLatter from "@/components/NewsLatter";
import ProductCards from "@/components/ProductCards";
import { Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { VscChevronRight } from "react-icons/vsc";
import useSWR from "swr";

function HomePage() {
  const { data: allProducts, error: productError, isLoading: productIsLoading } = useSWR("/products");
  const { data: allCategories, error: errorCategories, isLoading: categoryIsLoading } = useSWR("/categories");

  if (productError || errorCategories) {
    throw new Error("Something went wrong");
  }

  return (
    <>
      <div className="container py-5">
        {/* hero section */}

        <div className="grid grid-cols-12 gap-8">
          {/* sidebar */}
          <div className="lg:col-span-3 lg:block hidden border border-gray-200 h-fit">
            <div className="row gap-2 p-4 bg-blue-600 text-white font-bold text-sm">
              <FaBars fontSize={16} />
              SHOP BY CATEGORY
            </div>
            <div className="divide-gray-200 divide-y-[1px]">
              {allCategories?.map((cat, index) => {
                return (
                  <Link href="/" key={index} className="flex gap-2 hover:bg-blue-100 items-center uppercase p-4 bg-white text-slate-800 font-bold text-sm">
                    <VscChevronRight fontSize={20} />
                    {cat.name}
                  </Link>
                );
              })}
              {categoryIsLoading && (
                <div className="p-3">
            {[...Array(3)].map((_, index) => {
              return <Skeleton key={index} active />;
            })}
                </div>
              )}
            </div>
          </div>
          {/* carousel */}
          <div className="lg:col-span-9 col-span-12">
            <HeroSlider />
          </div>
        </div>

        {/* man women section */}
        <div className="grid lg:grid-cols-2 gap-10 py-10">
          <div className="relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
            <Image
              src="/man.jpg"
              alt="man"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 duration-500 z-10"
            />
            <div className="lg:p-20 md:p-10 p-5 z-30 flex items-center flex-col gap-6 justify-end md:min-h-80 relative">
              <p className="lg:text-5xl md:text-3xl text-2xl font-bold text-white">Men</p>
              <Link href="#" className="bg-white text-black text-lg font-bold text-center max-w-fit px-4 py-2 hover-effect duration-30">
                Shop now
              </Link>
            </div>
          </div>
          <div className="relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
            <Image
              src="/women.jpg"
              alt="man"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 duration-500 z-10"
            />
            <div className="lg:p-20 md:p-10 p-5 z-30 flex items-center flex-col gap-6 justify-end md:min-h-80 relative">
              <p className="lg:text-5xl md:text-3xl text-2xl font-bold text-white">Women</p>
              <Link href="#" className="bg-white text-black text-lg font-bold text-center max-w-fit px-4 py-2 hover-effect duration-30">
                Shop now
              </Link>
            </div>
          </div>
        </div>

        {/*  Popular Categories section */}
        <div className="mb-10">
          <p className="text-3xl mb-4 font-semibold">Popular Categories</p>
          <div className="grid lg:grid-cols-7 md:grid-cols-5 grid-cols-2 gap-4">
            <CategoryCards />
          </div>
          {categoryIsLoading && (
            <div className="grid lg:grid-cols-7 md:grid-cols-5 grid-cols-2 gap-4">
            {[...Array(5)].map((_, index) => {
              return <Skeleton key={index} active />;
            })}
            </div>
          )}
        </div>

        {/* Popular products section */}
        <div className="mb-10">
          <p className="text-3xl mb-4 font-semibold">Popular Products</p>
          <div className="grid lg:grid-cols-5 grid-cols-2 gap-4">
            <ProductCards data={allProducts?.products} />
          </div>
          {productIsLoading && (
            <div className="grid lg:grid-cols-5 grid-cols-2 gap-4">
            {[...Array(10)].map((_, index) => {
              return <Skeleton key={index} active />;
            })}
            </div>
          )}
        </div>

        {/* new arival section */}
        <div className="mb-10">
          <p className="text-3xl mb-4 font-semibold">New arivals</p>
          <div className="grid lg:grid-cols-5 grid-cols-2 gap-4">
            <ProductCards data={allProducts?.products} />
          </div>
          {productIsLoading && (
            <div className="grid lg:grid-cols-5 grid-cols-2 gap-4">
            {[...Array(10)].map((_, index) => {
              return <Skeleton key={index} active />;
            })}
            </div>
          )}
        </div>

        {/* new arival section */}
        <div className="mb-10">
          <p className="text-3xl mb-4 font-semibold">New arivals</p>
          <div className="grid lg:grid-cols-5 grid-cols-2 gap-4">
            <ProductCards data={allProducts?.products} />
          </div>
          {productIsLoading && (
            <div className="grid lg:grid-cols-5 grid-cols-2 gap-4">
            {[...Array(10)].map((_, index) => {
              return <Skeleton key={index} active />;
            })}
            </div>
          )}
        </div>





      </div>
      <NewsLatter />
    </>
  );
}

export default HomePage;
