import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/utils/connect";
import {
  RegisterRiderInput,
  RegisterRiderSchema,
} from "@/lib/validations/rider.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET,OPTIONS,DELETE,POST,PUT",
//   "Access-Control-Allow-Headers":
//     "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
//   "Access-Control-Allow-Credentials": "false",
// };

// export async function OPTIONS(req: NextRequest) {
//   return NextResponse.json({}, { headers: corsHeaders });
// }

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterRiderInput;
    const data = RegisterRiderSchema.parse(body);

    const hashedPassword = await hash(data.password, 12);

    const rider = await prisma.rider.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        phoneNo: data.phoneNo,
        deliveryMode: data.deliveryMode,
        vehicleNo: data.vehicleNo,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { cafe: { ...rider, password: undefined } },
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
