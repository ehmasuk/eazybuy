import NewsLatter from "@/components/NewsLatter";
import ShopContent from "@/components/ShopContent";
import { Suspense } from "react";

const ShopPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading shop content...</div>}>
        <ShopContent />
      </Suspense>
      <NewsLatter />
    </>
  );
};

export default ShopPage;