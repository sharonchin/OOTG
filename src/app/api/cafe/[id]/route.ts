import CAFE_CATEGORY from "@/constants/CAFE_CATEGORY";
import { getErrorResponse } from "@/lib/helpers";
import {
  UpdateCafeInput,
  UpdateCafeSchema,
} from "@/lib/validations/cafe.schema";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

//Fetch a specified cafe
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const cafeId = params.id;
    const cafe = await prisma.cafe.findUnique({
      where: {
        id: cafeId,
      },

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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cafeId = params.id;
    const body = (await req.json()) as UpdateCafeInput;
    const data = UpdateCafeSchema.parse(body);

    const cafe = await prisma.cafe.update({
      where: {
        id: cafeId,
      },
      data: {
        img: data.img,
        name: data.name,
        phoneNo: data.phoneNo,
        locId: data.locId,
        operatingHour: data.operatingHour,
        cafeCategory: data.cafeCategory as CAFE_CATEGORY,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { cafe: { ...cafe, password: undefined } },
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
