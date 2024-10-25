import NewsLatter from "@/components/NewsLatter";
import ProductCards from "@/components/ProductCards";
import Link from "next/link";

function ShopPage() {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-10">
                <p className="text-3xl mb-5">Shop</p>

                {/* topbar */}
                <div className="row justify-between gap-4 text-sm py-5 mb-5">
                    <div className="row gap-4">
                        <button className="px-4 py-2 hover:border-black border-white border active [&.active]:border-black">
                            <Link href="/">All products</Link>
                        </button>
                        <button className="px-4 py-2 hover:border-black border-white border [&.active]:border-black">
                            <Link href="/">Mobile</Link>
                        </button>
                        <button className="px-4 py-2 hover:border-black border-white border [&.active]:border-black">
                            <Link href="/">Laptop</Link>
                        </button>
                        <button className="px-4 py-2 hover:border-black border-white border [&.active]:border-black">
                            <Link href="/">Smart watch</Link>
                        </button>
                    </div>
                    <div className="row lg:gap-10 gap-5">
                        <div>
                            <label className="row gap-2 cursor-pointer">
                                <input type="checkbox" />
                                Show only products on sale
                            </label>
                        </div>
                        <div className="row gap-2">
                            <p>Sort by</p>
                            <select className="border-black border font-bold border-none outline-none w-fit">
                                <option>Select</option>
                                <option>Price: low to high</option>
                                <option>Price: high to low</option>
                                <option>Newest</option>
                                <option>Oldest</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
                    <ProductCards data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                </div>
            </div>
            <NewsLatter />
        </>
    );
}

export default ShopPage;
