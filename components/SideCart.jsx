"use client";

import { closeSideCart, removeFromCart } from "@/redux/CartSlice";
import { Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import { LuTrash2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

function SideCart() {
    const dispatch = useDispatch();

    const { cartItems, isSideCartOpen, totalPrice } = useSelector((reducers) => reducers.CartSlice);

    return (
        <Drawer title="Basic Drawer" onClose={() => dispatch(closeSideCart())} open={isSideCartOpen}>
            {cartItems?.map((cartItem,index) => {
                return (
                    <div key={index} className="rounded border border-gray-100 mb-4 shadow p-2 grid grid-cols-3 gap-4 ">
                        <div className="col-span-1">
                            <div className="relative w-full h-full">
                                <Image fill sizes="(min-width: 1340px) 100px, calc(19.9vw - 45px)" src={cartItem.image} alt="image" className="max-lg:w-full rounded object-contain" />
                            </div>
                        </div>
                        <div className="col-span-2 detail grid w-full">
                            <Link href={"/product/" + cartItem.slug}>
                                <h5 className="font-manrope font-semibold text-sm text-gray-900 line-clamp-2">{cartItem.title}</h5>
                            </Link>

                            <div className="flex justify-between items-center">
                                <h6 className="text-indigo-600 font-manrope font-semibold leading-9 text-right flex items-center gap-2">
                                    ${cartItem.newPrice}
                                    <span className="text-black font-normal text-xs">X {cartItem.quantity}</span>
                                </h6>
                                {cartItem.selectedColor && <div className="size-3 rounded-full" style={{ backgroundColor: cartItem.selectedColor?.code }}></div>}

                                {cartItem.selectedSize && <div className="text-xs font-semibold uppercase">{cartItem.selectedSize?.name}</div>}

                                <LuTrash2 size={16} color="red" role="button" onClick={() => dispatch(removeFromCart(cartItem))} />
                            </div>
                        </div>
                    </div>
                );
            })}
            {totalPrice > 0 ? (
                <div>
                    <div className="flex flex-col mt-3 md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
                        <h5 className="text-gray-900 text-lg font-manrope font-semibold w-full max-md:text-center max-md:mb-4">Subtotal</h5>
                        <div className="flex items-center justify-between gap-3 ">
                            <h6 className="font-manrope text-lg font-semibold lead-10 text-indigo-600">${totalPrice}</h6>
                        </div>
                    </div>
                    <div className="grid mt-3 grid-cols-2 gap-4 items-center">
                        <button onClick={() => dispatch(closeSideCart())} className="rounded-lg p-2 border-2 border-indigo-600 text-indigo-600 font-semibold w-full text-center duration-500 hover:bg-indigo-700 hover:text-white ">
                            Continue shopping
                        </button>

                        <Link href="/checkout">
                            <button className="rounded-lg p-2 border-2 border-indigo-600 bg-indigo-600 text-white font-semibold w-full text-center duration-500 hover:bg-indigo-700 ">Checkout</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <p className="p-3 text-red-500 text-sm">Your cart is empty</p>
            )}
        </Drawer>
    );
}

export default SideCart;
