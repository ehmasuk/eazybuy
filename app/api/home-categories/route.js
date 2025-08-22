import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const homeCategories = await prisma.HomeCategory.findMany({
      include: {
        category: true,
      },
    });
    return NextResponse.json(homeCategories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

export const POST = async (req) => {
  const { categoryId } = await req.json();

  if (!categoryId) {
    return NextResponse.json({ message: "Category is required" }, { status: 400 });
  }

  try {
    const isExist = await prisma.HomeCategory.findFirst({ where: { categoryId } });

    if (isExist) {
      return NextResponse.json({ message: "Category already exist" }, { status: 400 });
    }

    const homeCategory = await prisma.HomeCategory.create({
      data: {
        categoryId,
      },
    });

    return NextResponse.json(homeCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

export const DELETE = async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Id is required" }, { status: 400 });
  }

  try {
    await prisma.HomeCategory.delete({ where: { id } });
    return NextResponse.json({ message: "Category removed" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
