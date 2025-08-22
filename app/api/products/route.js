import uploadToCloudinary from "@/helpers/uploadToCloudinary";
import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const subCategory = searchParams.get("subCategory");
  const price = searchParams.get("price");
  const sortBy = searchParams.get("sortBy");
  const search = searchParams.get("search");
  const title = searchParams.get("title");
  const section = searchParams.get("section");

  const where = {};

  if (section) {
    where.sectionTypes = {
      has: section,
    };
  }

  const categories = searchParams.getAll("category");

  if (categories.length > 0) {
    where.category = {
      slug: {
        in: categories,
      },
    };
  }

  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        category: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  if (title) {
    where.title = {
      contains: title,
      mode: "insensitive",
    };
  }

  if (subCategory) {
    where.subCategory = {
      slug: subCategory,
    };
  }

  if (price) {
    const [min, max] = price.split("-");
    where.newPrice = {
      gte: Number(min),
      lte: Number(max),
    };
  }

  const orderBy = {};

  if (sortBy) {
    const [field, order] = sortBy.split("-");
    orderBy[field] = order;
  } else {
    orderBy.createdAt = "desc";
  }

  try {
    const products = await prisma.products.findMany({
      where,
      include: {
        category: true,
        subCategory: true,
        sizes: true,
        colors: true,
        reviews: true,
      },
      skip: (page - 1) * limit,
      take: Number(limit),
      orderBy,
    });

    const totalProducts = await prisma.products.count({ where });

    return NextResponse.json(
      {
        products,
        totalPages: Math.ceil(totalProducts / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

export const POST = async (req) => {
  const { title, newPrice, colorIds, sizeIds, oldPrice, categoryId, subCategoryId, description, quantity, shipping, image, gallery, sectionTypes } = await req.json();

  if (!title || !newPrice || !gallery || !categoryId || !description || !quantity || !shipping || !image) {
    return NextResponse.json({ message: "Title,newPrice,gallery,categoryId,description,quantity,shipping,image are required" }, { status: 400 });
  }

  try {
    const slug = slugify(title, { trim: true, lower: true });

    const isExist = await prisma.products.findUnique({ where: { slug } });

    if (isExist) {
      return NextResponse.json({ message: "Product already exist" }, { status: 400 });
    }

    const uploadedImage = await uploadToCloudinary(image);

    let galleryToStore = [];

    for (const image of gallery) {
      const uploadedImageurl = await uploadToCloudinary(image);
      galleryToStore.push(uploadedImageurl);
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
        image: uploadedImage,
        gallery: galleryToStore,
        sectionTypes,
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

export const DELETE = async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Id is required" }, { status: 400 });
  }

  try {
    await prisma.products.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
