import { getErrorResponse } from "@/lib/helpers";
import {
  UpdateRiderInput,
  UpdateRiderSchema,
} from "@/lib/validations/rider.schema";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const riderId = params.id;
    const body = (await req.json()) as UpdateRiderInput;
    const data = UpdateRiderSchema.parse(body);

    const rider = await prisma.rider.update({
      where: {
        id: riderId,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNo: data.phoneNo,
        deliveryMode: data.deliveryMode,
        vehicleNo: data.vehicleNo,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { rider: { ...rider, password: undefined } },
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
