import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/utils/connect";
import {
  RegisterCafeInput,
  RegisterCafeSchema,
} from "@/lib/validations/cafe.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import USERTYPE from "@/constants/USERTYPE";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterCafeInput;
    const data = RegisterCafeSchema.parse(body);

    const hashedPassword = await hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        userType: "CAFE" as USERTYPE,
      },
    });

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
        userId: user.id,
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
