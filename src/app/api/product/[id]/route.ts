import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import {
  UpdateProductInput,
  ProductUpdateSchema,
} from "@/lib/validations/product.schema";
import { getErrorResponse } from "@/lib/helpers";
import { ZodError } from "zod";

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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const body = (await req.json()) as UpdateProductInput;
    const data = ProductUpdateSchema.parse(body);

    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        img: data.img,
        name: data.name,
        price: data.price as number,
        desc: data.desc as string,
        productCategory: data.productCategory,
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return getErrorResponse(500, error.message);
  }
}
