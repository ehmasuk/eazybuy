"use client";

import { Rate } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useSWR from "swr";

const SearchBox = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { data: productsData, error } = useSWR(searchQuery ? `/products?title=${searchQuery}` : null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/shop?search=${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="hidden lg:block" ref={searchContainerRef}>
      <form className="min-w-96" onSubmit={handleSearchSubmit}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoSearchSharp className="text-gray-500" fontSize={20} />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full px-4 outline-none py-3 ps-10 text-sm text-gray-900 border border-blue-300 rounded-lg bg-gray-50"
            placeholder="Search products..."
            required
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="text-sm text-white absolute rounded px-2 py-1.5 end-2 bottom-1/2 translate-y-1/2 bg-blue-600 hover:bg-blue-700">
            Search
          </button>
          {showSuggestions && productsData?.products?.length > 0 && (
            <div className="w-full absolute z-50 left-0 top-14 bg-white shadow-lg p-1 max-h-[300px] overflow-auto search_dropdown">
              <div className="flex flex-col gap-3">
                {productsData.products.map((product) => (
                  <Link href={`/product/${product.slug}`} key={product.id} onClick={() => setShowSuggestions(false)}>
                    <span className="flex items-center gap-4 px-4 py-2 rounded bg-background hover:bg-muted/50 hover:bg-blue-50 transition">
                      <Image src={product.image} alt={product.title} width={48} height={48} className="rounded-md size-12 object-cover" />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm line-clamp-2">{product.title}</h3>
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-gray-500">
                            <b>{product.category.name}</b>
                          </p>
                          <Rate allowHalf disabled value={product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length} className="[&_*]:text-xs !mt-[-5px]" />
                        </div>
                      </div>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
