"use client";
import { FaRegHeart } from "react-icons/fa6";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

import { calcAvrRating } from "@/helpers/helperFunctions";
import { addToCart, opneSideCart } from "@/redux/CartSlice";
import { Image, InputNumber, message, Rate } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

function ProductHeroSection({ product }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (product?.sizeIds?.length > 0 && !selectedSize) {
            message.error("Please select products size");
        } else if (product?.colorIds?.length > 0 && !selectedColor) {
            message.error("Please select products color");
        } else {
            dispatch(
                addToCart({
                    id: product.id,
                    slug: product.slug,
                    title: product.title,
                    newPrice: product.newPrice,
                    oldPrice: product.oldPrice,
                    image: product.image,
                    selectedSize,
                    shipping: product.shipping,
                    selectedColor,
                    quantity: selectedQuantity,
                })
            );
            message.success("Product added to cart");
            dispatch(opneSideCart());
        }
    };

    return (
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-10">
            <div className="lg:col-span-5">
                <Image.PreviewGroup>
                    <div className="grid grid-cols-[100px_auto] gap-5">
                        <div className="flex flex-col relative gap-3">
                            {product?.gallery?.map((image, index) => {
                                return <Image key={index} sizes="100px" fill src={image} alt="image" className="border border-blue-100" />;
                            })}
                        </div>
                        <div className="w-full">
                            <Image sizes="(min-width: 1340px) 331px, calc(39.63vw - 192px)" fill className="border p-3 border-blue-100" src={product?.image} alt="image" />
                        </div>
                    </div>
                </Image.PreviewGroup>
            </div>
            <div className="lg:col-span-7">
                <Link href="/" className="hover:text-blue-600 duration-300">
                    {product?.category?.name}
                </Link>
                <p className="text-3xl my-3">{product?.title}</p>
                <div className="flex items-baseline gap-3">
                    <p className="text-orange-500 font-bold">{calcAvrRating(product?.reviews)}</p>
                    <Rate allowHalf disabled defaultValue={calcAvrRating(product?.reviews)} className="[&_*]:text-sm" />
                    <a href="#review-section" className="text-sm text-gray-500 hover:text-black">
                        ( {product?.reviews?.length || 0} )
                    </a>
                </div>
                <div className="lg:my-8 my-4">
                    <div className="grid gap-4">
                        {/* colors */}
                        {product?.colorIds?.length > 0 && (
                            <div className="grid grid-cols-[120px_auto] gap-2 text-sm items-center">
                                <p>Colors</p>
                                <div className="flex items-center gap-2">
                                    {product.colors.map((color, index) => {
                                        return (
                                            <div
                                                onClick={() => setSelectedColor({ id: color.id, code: color.code, name: color.name })}
                                                key={index}
                                                className={`size-5 hover:ring-2 border border-slate-400 rounded-full cursor-pointer ${selectedColor?.id === color.id ? "ring-2" : ""}`}
                                                style={{ backgroundColor: color.code }}
                                            ></div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        {/* sizes */}
                        {product?.sizeIds?.length > 0 && (
                            <div className="grid grid-cols-[120px_auto] gap-2 text-sm items-center">
                                <p>Sizes</p>
                                {product.sizeIds.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        {product.sizes.map((size, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => setSelectedSize({ id: size.id, name: size.name })}
                                                    className={`p-1 text-sm font-semibold border cursor-pointer border-slate-200 hover-effect uppercase flex items-center justify-center ${
                                                        selectedSize?.id === size.id ? "bg-blue-600 text-white" : ""
                                                    }`}
                                                >
                                                    {size.name}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="grid grid-cols-[120px_auto] gap-2 text-sm items-center">
                            <p>Availability</p>
                            <b>In Stock</b>
                        </div>
                    </div>
                </div>
                {/* price */}
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-3xl ">${product?.newPrice}</p>
                    <del className="text-lg text-red-500">
                        {product?.oldPrice && "$"}
                        {product?.oldPrice}
                    </del>
                </div>
                {/* buttons */}
                <div className="lg:mt-8 mt-4 py-8 border-t border-b border-gray-200">
                    <div className="grid grid-cols-2 gap-5 items-end">
                        <button onClick={handleAddToCart} className="bg-black text-white p-3 w-full hover-effect uppercase">
                            Add to cart
                        </button>

                        <div className="">
                            <p className="mb-2">Quantity</p>
                            <InputNumber size="large" min={1} max={10} value={selectedQuantity} onChange={(e) => setSelectedQuantity(e)} />
                        </div>
                    </div>
                    <div className="flex items-center gap-5 lg:gap-10">

                        <button className="flex items-center gap-2 hover:text-blue-600 mt-5">
                            <IoChatboxEllipsesOutline fontSize={18} />
                            Ask about product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductHeroSection;
