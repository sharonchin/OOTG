import { getErrorResponse } from "@/lib/helpers";
import {
  UpdateProductInput,
  ProductUpdateSchema,
} from "@/lib/validations/product.schema";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET,OPTIONS,DELETE,POST,PUT",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
  "Access-Control-Allow-Credentials": "true",
};

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

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
