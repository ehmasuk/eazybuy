import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const product = await prisma.products.findUnique({
      where: { id: params.id },
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

