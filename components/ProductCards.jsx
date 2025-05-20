import { calcAvrRating } from "@/helpers/helperFunctions";
import { Rate, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { GoEye } from "react-icons/go";
import QuickAddProduct from "./QuickAddProduct";

function ProductCards({ data }) {
    const calCulateDiscount = (oldPrice, newPrice) => {
        const discount = ((oldPrice - newPrice) / oldPrice) * 100;
        return Math.round(discount);
    };

    return (
        <>
            {data?.map((product, index) => {
                return (
                    <div key={index} className="group mb-10">
                        <div className="relative p-4 lg:min-h-96 md:min-h-80 min-h-64  w-full overflow-hidden">
                            <Link href={`/product/${product.slug}`}>
                                <Image
                                    src={product.image}
                                    alt="image"
                                    fill
                                    sizes="(min-width: 1340px) 218px, calc(19.9vw - 45px)"
                                    className="absolute left-0 top-0 w-full h-full p-3 object-contain border border-blue-100"
                                />
                            </Link>

                            {/* cart options */}
                            <QuickAddProduct product={product} />

                            {/* discount */}
                            {calCulateDiscount(product?.oldPrice, product?.newPrice) > 0 && (
                                <p className="absolute top-2 left-2 text-xs text-white bg-blue-600 px-3 py-1">-{calCulateDiscount(product?.oldPrice, product?.newPrice)}%</p>
                            )}

                            {/* options */}
                            <div className="absolute  -right-[60px] opacity-0 duration-300 group-hover:right-4 group-hover:opacity-100">
                                <div className="flex flex-col items-center gap-2 text-white">
                                    <Tooltip placement="left" title="Add to wishlist">
                                        <button className="size-10 bg-black text-white flex items-center justify-center hover-effect">
                                            <CiHeart fontSize={20} />
                                        </button>
                                    </Tooltip>
                                    <Tooltip placement="left" title="View product">
                                        <Link href={`/product/${product.slug}`}>
                                            <button className="size-10 bg-black text-white flex items-center justify-center hover-effect">
                                                <GoEye fontSize={20} />
                                            </button>
                                        </Link>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <Link href={`/product/${product.slug}`}>
                            <p title={product.title} className="font-semibold mt-3 line-clamp-2 min-h-[48px]">{product.title}</p>
                        </Link>
                        <div className="flex items-center gap-1 mt-1">
                            <p>{calcAvrRating(product?.reviews)}</p>
                            <Rate allowHalf disabled defaultValue={calcAvrRating(product?.reviews)} className="[&_*]:text-sm !-mt-1" />
                            <p className="text-gray-500 text-xs md:block hidden">{product?.reviews?.length || 0} reviews </p>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                            <p className="text-blue-600 font-semibold text-lg">${product.newPrice}</p>
                            <del className="text-gray-600 text-sm font-semibold">
                                {product?.oldPrice && "$"}
                                {product?.oldPrice}
                            </del>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default ProductCards;
