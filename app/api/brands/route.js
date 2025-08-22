import uploadToCloudinary from "@/helpers/uploadToCloudinary";
import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const brands = await prisma.brands.findMany();
    return NextResponse.json(brands, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch brands." }, { status: 500 });
  }
};

export const POST = async (req) => {
  const { name, image } = await req.json();

  if (!name || !image) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    const isExist = await prisma.brands.findUnique({ where: { name } });

    if (isExist) {
      return NextResponse.json({ message: "brand already exist" }, { status: 400 });
    }

    const uploadedImageUrl = await uploadToCloudinary(image);

    if (!uploadedImageUrl) {
      return res.status(400).json({ message: "Cannot upload image to cloudinary" });
    }

    const slug = name.toLowerCase().replaceAll(" ", "-").trim();

    const brand = await prisma.brands.create({ data: { name, image: uploadedImageUrl, slug } });

    if (!brand) {
      return NextResponse.json({ message: "Something went wrong" }, { status: 400 });
    }

    return NextResponse.json({ message: "Brand created" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
};
