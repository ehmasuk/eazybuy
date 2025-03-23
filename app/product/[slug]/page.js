import ProductHeroSection from "@/components/ProductHeroSection";
import ProductReviews from "@/components/ProductReviews";
import { fetchData } from "@/hooks/fetchData";
import { redirect } from "next/navigation";
async function ProductDetails({ params }) {
    const product = await fetchData(`/singleproduct?slug=${params.slug}`);

    if (!product) return redirect("/404");

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
