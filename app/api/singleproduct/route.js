import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const slug = req.nextUrl.searchParams.get("slug");

    if (!slug) {
        return NextResponse.json({ message: "slug is required" }, { status: 400 });
    }
    try {
        const products = await prisma.products.findUnique({
            where: {
                slug,
            },
            include: {
                category: true,
                subCategory: true,
                sizes: true,
                colors: true,
                reviews: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
};
