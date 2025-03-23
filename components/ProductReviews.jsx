"use client";
import { MdVerified } from "react-icons/md";

import { calcAvrRating, ratingPercenages } from "@/helpers/helperFunctions";
import { Image, message, Progress, Rate } from "antd";
import moment from "moment";
import { AnimatePresence, motion } from "motion/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ProductReviewPopup from "./ProductReviewPopup";

function ProductReviews({ product }) {
    const session = useSession();

    const [reviewPopupIsOpen, setReviewPopupIsOpen] = useState(false);

    const handleOpenReview = () => {
        if (session?.data?.user) {
            setReviewPopupIsOpen(true);
        } else {
            message.error("Please login first to add a review");
        }
    };

    return (
        <div>
            <section className="bg-white py-8 antialiased md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div id="review-section" className="flex items-center gap-2">
                        <p className="text-3xl">Customer reviews</p>
                    </div>
                    <div className="my-6 gap-8 grid lg:grid-cols-12">
                        <div className="shrink-0 space-y-4 col-span-4">
                            <div>
                                <div className="text-4xl flex items-center gap-2 font-semibold leading-none text-gray-900 mb-2">
                                    {calcAvrRating(product?.reviews)}
                                    <Rate allowHalf disabled defaultValue={calcAvrRating(product?.reviews)} className="[&_*]:text-sm" />
                                </div>
                                <p className="text-sm leading-none text-gray-900">based on {product?.reviews?.length || 0} ratings</p>
                            </div>

                            <div className=" min-w-0 flex-1 space-y-3 sm:mt-0 my-5">
                                {ratingPercenages(product?.reviews).map((item, index) => {
                                    return (
                                        <div key={index} className="flex items-center gap-2">
                                            <p className="w-5 shrink-0 text-start text-sm font-medium leading-none text-gray-900 ">{item.rating}</p>
                                            <Progress size={[300, 10]} strokeColor="#FDE047" percent={item.percentage} />
                                        </div>
                                    );
                                })}
                            </div>
                            <button onClick={handleOpenReview} className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800">
                                Write a review
                            </button>
                        </div>
                        <div className="lg:mt-12 mt-5 divide-gray-200 col-span-8">
                            {product?.reviews?.map((review, index) => {
                                return (
                                    <div key={index} className="gap-3 pb-6 sm:flex sm:items-start">
                                        <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold">{review.rating.toFixed(1)}</p>
                                                <Rate allowHalf disabled defaultValue={review.rating} className="[&_*]:text-sm" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-base font-semibold text-gray-900">{review?.user?.name}</p>
                                                <p className="text-sm font-normal text-gray-500">{moment(review.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
                                            </div>
                                            <div className="inline-flex items-center gap-1">
                                                <MdVerified className="text-blue-700" fontSize={25} />
                                                <p className="text-sm font-medium text-gray-900">Verified purchase</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                                            <p className="text-base font-normal text-black">{review.comment}</p>
                                            {review.images?.length > 0 && (
                                                <div className="flex gap-2">
                                                    {review.images.map((url, index) => {
                                                        return <Image key={index} className="!h-32 !w-20 rounded !object-contain" src={url} alt="imac-photo-2" />;
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            <p className="text-right">
                                <b>{product?.reviews?.length}</b> reviews
                            </p>

                            {/* <div className="mt-6">
                                <button
                                    type="button"
                                    className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700"
                                >
                                    View more reviews
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
            {/* Add review modal */}
            <AnimatePresence>
                {reviewPopupIsOpen && (
                    <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <ProductReviewPopup setIsOpen={setReviewPopupIsOpen} product={product} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ProductReviews;
