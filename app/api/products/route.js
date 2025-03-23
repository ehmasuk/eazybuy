import uploadToCloudinary from "@/helpers/uploadToCloudinary";
import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export const GET = async () => {
    try {
        const products = await prisma.products.findMany({
            include: {
                category: true,
                subCategory: true,
                sizes: true,
                colors: true,
                reviews:true,
            },
        });

        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
};

export const POST = async (req) => {
    const { title, newPrice, colorIds, sizeIds, oldPrice, categoryId, subCategoryId, description, quantity, shipping, image, gallery } = await req.json();

    if (!title || !newPrice || !gallery || !categoryId || !description || !quantity || !shipping || !image) {
        return NextResponse.json({ message: "Title,newPrice,gallery,categoryId,description,quantity,shipping,image are required" }, { status: 400 });
    }

    try {
        const slug = slugify(title, { trim: true, lower: true });

        const isExist = await prisma.products.findUnique({ where: { slug } });

        if (isExist) {
            return NextResponse.json({ message: "Product already exist" }, { status: 400 });
        }

        const uploadedImage = await uploadToCloudinary.uploader.upload(image, { folder: "eazybuy" });

        let galleryToStore = [];

        for (const image of gallery) {
            const uploadedImage = await uploadToCloudinary.uploader.upload(image, { folder: "eazybuy" });
            galleryToStore.push(uploadedImage.secure_url);
        }

        const product = await prisma.products.create({
            data: {
                title,
                newPrice,
                oldPrice,
                slug,
                categoryId,
                subCategoryId,
                description,
                colorIds,
                sizeIds,
                quantity,
                shipping,
                image: uploadedImage.secure_url,
                gallery: galleryToStore,
            },
        });

        if (!product) {
            return NextResponse.json({ message: "Something went wrong" }, { status: 400 });
        }

        return NextResponse.json({ message: "Product created" }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
};
