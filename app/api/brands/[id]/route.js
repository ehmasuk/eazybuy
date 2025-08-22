import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";


export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    await prisma.brands.delete({ where: { id: id }});

    return NextResponse.json({ message: "Brand deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting brand:", error);
    return NextResponse.json({ message: "Failed to delete brand." }, { status: 500 });
  }
};