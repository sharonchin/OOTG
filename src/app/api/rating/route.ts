import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import STATUS from "@/constants/STATUS";
//CREATE ORDER
export const POST = async (req: NextRequest) => {
  try {
    let body = await req.json();

    const rating = await prisma.rating.create({
      data: body,
    });

    return new NextResponse(JSON.stringify(rating), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
