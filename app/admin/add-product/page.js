"use client";

import ProductsForm from "@/components/admin/ProductsForm";
import useSWR from "swr";

function AddProducts() {
  const { data: allCategories } = useSWR("/categories");
  const { data: allSubCategories } = useSWR("/subcategories");
  const { data: allColors } = useSWR("/colors");
  const { data: allSizes } = useSWR("/sizes");

  return <ProductsForm allCategories={allCategories} allColors={allColors} allSizes={allSizes} allSubCategories={allSubCategories} />;
}

export default AddProducts;
