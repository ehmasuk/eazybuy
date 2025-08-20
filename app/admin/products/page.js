"use client";

import Table from "@/components/Table";
import useSWR from "swr";

function Products() {
  const { data: allProducts } = useSWR("/products");

  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800">Products</h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">{allProducts?.products?.length}</span>
        </div>
        <div className="flex flex-col mt-6">
          <Table
            data={allProducts?.products}
            image={{ value: ["image"] }}
            rows={[
              { label: "Name", value: ["title"] },
              { label: "Price", value: ["newPrice"] },
              { label: "Old price", value: ["oldPrice"] },
              { label: "Category", value: ["category", "name"] },
              { label: "Quantity", value: ["quantity"] },
              { label: "Shipping", value: ["shipping"] },
            ]}
            actions={true}
          />
          {/* <pre>{JSON.stringify(allProducts, null, 2)}</pre> */}
        </div>
      </section>
    </div>
  );
}

export default Products;
