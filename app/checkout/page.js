"use client";

import usePost from "@/hooks/usePost";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function CheckoutPage() {
    const [isReady, setIsReady] = useState(false);

    const { cartItems, totalPrice } = useSelector((reducers) => reducers.CartSlice);

    const router = useRouter()

    useEffect(() => {
        setIsReady(true);
    }, []);

    const { postData } = usePost();

    const handleStripePayment = async () => {
        postData(
            "/stripe-payment",
            { products: cartItems, userId: 1 },
            (res) => {
                router.push(res.url)
                console.log(res.url);
            },
            (err) => {
                console.log(err);
            }
        );
        console.log({ products: cartItems, userId: 1 });
    };

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 sm:text-base">
                    <li className="after:border-1 flex items-center text-blue-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Cart
                        </span>
                    </li>
                    <li className="after:border-1 flex items-center text-blue-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Checkout
                        </span>
                    </li>
                    <li className="flex shrink-0 items-center">
                        <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Order summary
                    </li>
                </ol>

                <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">Delivery Details</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-gray-900">
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        id="your_name"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Bonnie Green"
                                        required
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <label htmlFor="select-city-input-3" className="block text-sm font-medium text-gray-900">
                                            City
                                        </label>
                                    </div>
                                    <select
                                        id="select-city-input-3"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option selected>San Francisco</option>
                                        <option value="NY">New York</option>
                                        <option value="LA">Los Angeles</option>
                                        <option value="CH">Chicago</option>
                                        <option value="HU">Houston</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="phone-input-3" className="mb-2 block text-sm font-medium text-gray-900">
                                        Phone Number
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="name@flowbite.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="name@flowbite.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                                        Address line 1
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="name@flowbite.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                                        Address line 2
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="name@flowbite.com"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                        {isReady &&
                            cartItems?.map((cartItem) => {
                                return (
                                    <div key={cartItem.id} className="rounded border border-gray-100 mb-4 shadow p-2 grid grid-cols-3 gap-4 ">
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
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        <div className="flow-root">
                            <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500">Items</dt>
                                    <dd className="text-base font-medium text-gray-900">{isReady && cartItems?.length}</dd>
                                </dl>
                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500">Shipping</dt>
                                    <dd className="text-base font-medium text-gray-900">0</dd>
                                </dl>
                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-bold text-gray-900">Total</dt>
                                    <dd className="text-base font-bold text-gray-900">${isReady && totalPrice}</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <button
                                type="submit"
                                onClick={handleStripePayment}
                                className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default CheckoutPage;
