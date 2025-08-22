"use client";

import NewsLatter from "@/components/NewsLatter";
import ProductCards from "@/components/ProductCards";

import { Pagination, Skeleton, Slider } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

const ShopContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const selectedCategories = searchParams.getAll("category");

  const { data: productsData, error: productsError, isLoading: productsLoading } = useSWR(`/products?${searchParams.toString()}`);
  const { data: categories, error: categoriesError } = useSWR("/categories");

  const handleFilterChange = (filterType, value) => {
    const params = new URLSearchParams(searchParams);

    if (filterType === "category") {
      const existingCategories = params.getAll(filterType);
      if (existingCategories.includes(value)) {
        const newCategories = existingCategories.filter((category) => category !== value);
        params.delete(filterType);
        newCategories.forEach((category) => params.append(filterType, category));
      } else {
        params.append(filterType, value);
      }
    } else {
      if (params.has(filterType, value)) {
        params.delete(filterType, value);
      } else {
        params.append(filterType, value);
      }
    }
    router.push(`?${params.toString()}`);
  };

  const handlePriceChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("price", `${value[0]}-${value[1]}`);
    router.push(`?${params.toString()}`);
  };

  const handlePagination = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  const handleSort = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", e.target.value);
    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("?");
  };

  if (productsError || categoriesError) {
    throw new Error("Something went wrong");
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex gap-8">
          <div className="hidden lg:block w-80 flex-shrink-0">
            <h2 className="font-semibold text-xl mt-4 mb-4">Filter</h2>
            <hr className="my-4" />
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-3">
                {categories?.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="">
                      <label htmlFor={category.slug} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          id={category.slug}
                          value={category.slug}
                          onChange={(e) => handleFilterChange("category", e.target.value)}
                          checked={selectedCategories.includes(category.slug)}
                        />
                        {category.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr className="my-4" />
            <div>
              <h3 className="font-semibold mb-3">Price range</h3>
              <Slider range defaultValue={[20, 100]} max={1000} onChangeComplete={handlePriceChange} />
              <div className="flex text-semibold justify-between">
                <span>${searchParams.get("price")?.split("-")[0] || 20}</span>
                <span>${searchParams.get("price")?.split("-")[1] || 100}</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {search && (
                <h2 className="text-xl font-semibold">
                  Searched for: <b>{search}</b>
                </h2>
              )}
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedCategories.map((category) => (
                <span key={category} data-slot="badge" className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium bg-blue-500 text-white gap-1">
                  {category}
                </span>
              ))}
              {searchParams.toString() && (
                <button className="ml-1 hover:text-destructive" onClick={handleReset}>
                  Reset
                </button>
              )}
            </div>
            <div className="row justify-between gap-4 text-sm py-5 mb-5">
              <p>
                Showing 1-{productsData?.products?.length} of {productsData?.totalProducts} products
              </p>
              <div className="flex justify-between lg:gap-10 gap-5">
                <div className="flex gap-2">
                  <p>Sort by</p>
                  <select className="border-black border font-bold border-none outline-none w-fit" onChange={handleSort}>
                    <option value="">Select</option>
                    <option value="newPrice-asc">Price: low to high</option>
                    <option value="newPrice-desc">Price: high to low</option>
                    <option value="createdAt-desc">Newest</option>
                    <option value="createdAt-asc">Oldest</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
              <ProductCards data={productsData?.products} />
            </div>
            <Pagination align="center" current={Number(searchParams.get("page")) || 1} total={productsData?.totalPages * 10 || 2} onChange={handlePagination} />
          </div>
        </div>

        {productsLoading && (
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {[...Array(10)].map((_, index) => {
              return <Skeleton key={index} active />;
            })}
          </div>
        )}
      </div>
      <NewsLatter />
    </>
  );
};

export default ShopContent;
