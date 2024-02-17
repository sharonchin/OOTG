import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  try {
    const product = await prisma.product.findMany({
      where: {
        keywords: {
          has: search as string,
        },
      },
    });
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (err) {
    console.log(err);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
