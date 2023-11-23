import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

//Fetch a specified cafe
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const productId = params.id;
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },

      include: {
        cafe: true,
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

export const POST = async () => {
  return new NextResponse("Hello", { status: 200 });
};
