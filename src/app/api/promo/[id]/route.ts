import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import {
  UpdatePromoInput,
  PromoUpdateSchema,
} from "@/lib/validations/promo.schema";
import { getErrorResponse } from "@/lib/helpers";
import { ZodError } from "zod";

//Fetch a specified promo
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const promoId = params.id;
    const promo = await prisma.promo.findUnique({
      where: {
        id: promoId,
      },
    });
    return new NextResponse(JSON.stringify(promo), { status: 200 });
  } catch (err) {
    console.log(err);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};


export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const promoId = params.id;
    const body = (await req.json()) as UpdatePromoInput;
    const data = PromoUpdateSchema.parse(body);

    const promo = await prisma.promo.update({
      where: {
        id: promoId,
      },
      data: {
        discount: data.discount,
        min_spend_amount: data.min_spend_amount,
        capped_amount: data.capped_amount,
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
    const promoId = params.id;

    const promo = await prisma.promo.delete({
      where: {
        id: promoId,
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
