import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const foodiePassportId = params.id;

    const foodiePassport = await prisma.foodiePassport.update({
      where: {
        id: foodiePassportId,
      },
      data: {
        status: false,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { foodiePassport: { ...foodiePassport } },
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
