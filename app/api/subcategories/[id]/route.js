import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    await prisma.subCategories.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Sub-category deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
