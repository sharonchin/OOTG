import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import {
  CreatePromoInput,
  PromoCreationSchema,
} from "@/lib/validations/promo.schema";
import { ZodError } from "zod";
import { getErrorResponse } from "@/lib/helpers";
import PROMO_TYPE from "@/constants/PROMO_TYPE";

//Fetch all promos
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cafe = searchParams.get("cafe");

  console.log(cafe);

  try {
    const promo = await prisma.promo.findMany({
      where: {
        ...(cafe ? { cafeId: cafe as string } : {}),
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

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreatePromoInput;
    const data = PromoCreationSchema.parse(body);
    if (data.type === ("DELIVERY_VOUCHER" as PROMO_TYPE)) {
      const promo = await prisma.promo.create({
        data: {
          type: data.type,
          discount: 0,
          min_spend_amount: 0,
          capped_amount: 2,
          amount: 2,
          cafeId: data.cafeId,
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
    } else {
      const promo = await prisma.promo.create({
        data: {
          type: data.type,
          discount: data.discount,
          min_spend_amount: data.min_spend_amount,
          capped_amount: data.capped_amount,
          cafeId: data.cafeId,
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
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }
    return getErrorResponse(500, error.message);
  }
}
