import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/utils/connect";
import {
  RegisterRiderInput,
  RegisterRiderSchema,
} from "@/lib/validations/rider.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import USERTYPE from "@/constants/USERTYPE";


export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterRiderInput;
    const data = RegisterRiderSchema.parse(body);

    const hashedPassword = await hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        userType: "RIDER" as USERTYPE,
      },
    });

    const rider = await prisma.rider.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        phoneNo: data.phoneNo,
        deliveryMode: data.deliveryMode,
        vehicleNo: data.vehicleNo,
        userId: user.id,
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
    if (error.code === "P2002") {
      return getErrorResponse(409, "user with that email already exists");
    }
    return getErrorResponse(500, error.message);
  }
}
