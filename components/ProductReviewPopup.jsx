"use client";

import { imageToBase64 } from "@/helpers/imageToBase64";
import { revalidate } from "@/hooks/fetchData";
import usePost from "@/hooks/usePost";
import { Button, Form, message, Rate, Upload } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

function ProductReviewPopup({ setIsOpen, product }) {
    const [selectedRate, setSelectedRate] = useState(null);
    const [warn, setWarn] = useState(false);

    const session = useSession();

    const pathName = usePathname();

    const { postData, loading } = usePost();

    const handleSubmit = async (values) => {
        const images = [];

        if (values.images) {
            for (const file of values.images.fileList) {
                const imageInBase64 = await imageToBase64(file.originFileObj);
                images.push(imageInBase64);
            }
        }

        if (selectedRate) {
            const review = {
                rating: selectedRate,
                comment: values.comment,
                images,
                productId: product.id,
                userId: session?.data?.user?.id,
            };

            postData(
                "/product-review",
                review,
                () => {
                    revalidate(pathName);
                    setIsOpen(false);
                    message.success("Thank you for your valuable feedback");
                },
                () => {
                    message.error("Cannot create review");
                }
            );
        } else {
            setWarn(true);
        }
    };

    return (
        <div className="fixed left-0 flex right-0 top-0 z-50 py-5 bg-[#0000008f] h-[calc(100%+10em)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 antialiased">
            <div className="relative max-h-full w-full max-w-2xl p-4">
                {/* Modal content */}
                <div className="relative rounded-lg bg-white shadow">
                    {/* Modal header */}
                    <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
                        <div>
                            <h3 className="mb-1 text-lg font-semibold text-gray-900">Add a review for:</h3>
                            <p className="font-medium">{product?.title}</p>
                        </div>
                        <MdOutlineClose fontSize={20} onClick={() => setIsOpen(false)} className="cursor-pointer absolute right-2 top-2 hover:text-red-500" />
                    </div>
                    {/* Modal body */}
                    <div className="p-4 md:p-5">
                        <Form onFinish={handleSubmit}>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-900 mb-2">Select rating</label>
                                    <div className="flex items-center">
                                        <Rate
                                            allowHalf
                                            defaultValue={0}
                                            onChange={(e) => {
                                                setSelectedRate(e);
                                                setWarn(false);
                                            }}
                                            className="[&_*]:text-xl"
                                        />
                                        <span className="ms-2 text-lg font-bold text-gray-900">{selectedRate ? selectedRate.toFixed(1) : 0} out of 5</span>
                                    </div>
                                    {warn && <p className="text-red-500 text-sm block">Please select you rating</p>}
                                </div>
                                <div className="col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-900">Review description</label>
                                    <FormItem name="comment" rules={[{ required: true, message: "Please enter description" }]}>
                                        <TextArea placeholder="Write here..." autoSize={{ minRows: 4, maxRows: 10 }} />
                                    </FormItem>
                                </div>
                                <div className="col-span-2">
                                    <p className="mb-2 block text-sm font-medium text-gray-900">
                                        Add real photos of the product to help other customers <span className="text-gray-500">(Optional)</span>
                                    </p>
                                    <FormItem name="images">
                                        <Upload multiple beforeUpload={() => false} maxCount={5}>
                                            <Button>Click to Upload</Button>
                                        </Upload>
                                    </FormItem>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4 md:pt-5">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="me-2 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50"
                                >
                                    Add review
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductReviewPopup;
