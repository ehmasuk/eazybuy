import uploadToCloudinary from "@/helpers/uploadToCloudinary";
import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const subcategories = await prisma.subCategories.findMany({
            include: {
                parentCategory: true,
            },
        });
        return NextResponse.json(subcategories, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
};

export const POST = async (req) => {
    const { name, image, parentCategoryId } = await req.json();

    if (!name || !image || !parentCategoryId) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    try {
        const isExist = await prisma.subCategories.findUnique({ where: { name } });

        if (isExist) {
            return NextResponse.json({ message: "Sub category already exist" }, { status: 400 });
        }

        const uploadedImage = await uploadToCloudinary(image)

        if (!uploadedImage) {
            return res.status(400).json({ message: "Cannot upload image to cloudinary" });
        }

        const slug = name.toLowerCase().replaceAll(" ", "-").trim();

        const subCategory = await prisma.subCategories.create({ data: { name, image: uploadedImage, slug, parentCategoryId } });

        if (!subCategory) {
            return NextResponse.json({ message: "Something went wrong" }, { status: 400 });
        }

        return NextResponse.json({ message: "Subcategory created" }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
};
