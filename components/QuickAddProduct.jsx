"use client";

import { addToCart, opneSideCart } from "@/redux/CartSlice";
import { message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

function QuickAddProduct({ product }) {
    const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

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
                    quantity: 1,
                })
            );
            message.success("Product added to cart");
            dispatch(opneSideCart());
        }
    };

    return (
        <div className="absolute -bottom-[60px] opacity-0 duration-300 group-hover:bottom-4 group-hover:opacity-100 left-1/2 -translate-x-1/2 min-w-[90%]">
            <div className="p-3 text-sm bg-white text-black flex flex-col items-center justify-center gap-2">
                {product?.colorIds?.length > 0 || product?.sizeIds?.length > 0 ? <p>Quick add to cart</p> : null}

                {/* sizes */}
                {product?.sizeIds?.length > 0 && (
                    <div className="flex items-center justify-center gap-2">
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

                {/* colors */}
                {product?.colorIds?.length > 0 && (
                    <div className="flex items-center justify-center gap-2">
                        {product.colors.map((color, index) => {
                            return (
                                <div
                                    onClick={() => setSelectedColor({ id: color.id, code: color.code, name: color.name })}
                                    key={index}
                                    className={`size-5 hover:ring-2 border border-slate-800 rounded-full cursor-pointer ${selectedColor?.id === color.id ? "ring-2" : ""}`}
                                    style={{ backgroundColor: color.code }}
                                ></div>
                            );
                        })}
                    </div>
                )}

                <button onClick={handleAddToCart} className="flex items-center text-sm gap-2 w-full bg-black px-4 py-2 text-white hover-effect justify-center">
                    Add to cart
                </button>
            </div>
        </div>
    );
}

export default QuickAddProduct;
