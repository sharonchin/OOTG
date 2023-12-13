import { getErrorResponse } from "@/lib/helpers";
import {
  UpdatePromoInput,
  PromoUpdateSchema,
} from "@/lib/validations/promo.schema";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const promoId = params.id;

    const promo = await prisma.promo.update({
      where: {
        id: promoId,
      },
      data: {
        status: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { promo: { ...promo } },
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
