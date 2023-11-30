import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import {
  CreateProductInput,
  ProductCreationSchema,
} from "@/lib/validations/product.schema";
import { ZodError } from "zod";
import { getErrorResponse } from "@/lib/helpers";

//Fetch all products
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cafe = searchParams.get("cafe");
  try {
    const product = await prisma.product.findMany({
      where: {
        ...(cafe ? { cafeId: cafe as string } : {}),
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

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateProductInput;
    const data = ProductCreationSchema.parse(body);

    const product = await prisma.product.create({
      data: {
        img: data.img,
        name: data.name,
        price: data.price as number,
        desc: data.desc as string,
        productCategory: data.productCategory,
        cafeId: data.cafeId,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { product: { ...product } },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }
    return getErrorResponse(500, error.message);
  }
}
