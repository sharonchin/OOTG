import { getErrorResponse } from "@/lib/helpers";
import {
  UpdateProductInput,
  ProductUpdateSchema,
} from "@/lib/validations/product.schema";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";



export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        availability: true,
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
    return getErrorResponse(500, error.message);
  }
}
