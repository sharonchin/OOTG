import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/utils/connect";
import {
  RegisterCafeInput,
  RegisterCafeSchema,
} from "@/lib/validations/cafe.schema";
import { hash } from "bcryptjs";
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

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterCafeInput;
    const data = RegisterCafeSchema.parse(body);

    const hashedPassword = await hash(data.password, 12);

    const cafe = await prisma.cafe.create({
      data: {
        img: data.file,
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phoneNo: data.phoneNo,
        locId: data.locId,
        operatingHour: data.operatingHour,
        cafeCategory: data.cafeCategory,
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
    if (error.code === "P2002") {
      return getErrorResponse(409, "user with that email already exists");
    }
    return getErrorResponse(500, error.message);
  }
}
