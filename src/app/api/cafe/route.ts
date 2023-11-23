import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// const api_key = "443248966918758"
// const cloud_name = "devlognxn"

//Fetch all cafe
export const GET = async () => {
  try {
    const cafe = await prisma.cafe.findMany({
      include: {
        loc: true,
      },
    });
    return new NextResponse(JSON.stringify(cafe), { status: 200 });
  } catch (err) {
    console.log(err);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export const POST = async () => {
  return new NextResponse("Hello", { status: 200 });
};
