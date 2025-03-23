import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import uploadToCloudinary from "@/helpers/uploadToCloudinary";

// get reviews
export const GET = async (req) => {
    const productId = req.nextUrl.searchParams.get("id");

    try {
        
        if (productId) {
            const productReviews = await prisma.productReviews.findMany({
                where: {
                    productId,
                },
                include: {
                    user: true,
                },
            });
            if (!productReviews) return NextResponse.json({ message: "No Reviews Found" }, { status: 404 });
            return NextResponse.json(productReviews, { status: 200 });
        } else {
            const allReviews = await prisma.productReviews.findMany();
            return NextResponse.json(allReviews, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
};

// create review

export const POST = async (req) => {
    const { comment, rating, images, productId, userId } = await req.json();
    if (!comment || !rating || !productId || !userId) {
        return NextResponse.json({ message: "Please fill all the required fields" }, { status: 400 });
    }

    try {
        // upload images to cloudinary
        let reviewImages = [];

        if (images.length > 0) {
            for (const image of images) {
                const uploadedImage = await uploadToCloudinary.uploader.upload(image, { folder: "eazybuy" });
                reviewImages.push(uploadedImage.secure_url);
            }
        } else {
            reviewImages = null;
        }
        // create review
        await prisma.productReviews.create({
            data: {
                comment,
                rating,
                images: reviewImages,
                productId,
                userId,
            },
        });
        return NextResponse.json({ message: "Review created successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
};

// delete review
export const DELETE = async (req) => {
    const reviewId = req.nextUrl.searchParams.get("reviewId");
    try {
        const productReview = await prisma.productReviews.delete({
            where: {
                id: reviewId,
            },
        });
        if (!productReview) return NextResponse.json({ message: "No Review Found" }, { status: 404 });
        return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
};
