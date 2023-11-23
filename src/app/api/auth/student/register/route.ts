import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/utils/connect";
import {
  RegisterStudentInput,
  RegisterStudentSchema,
} from "@/lib/validations/student.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterStudentInput;
    const data = RegisterStudentSchema.parse(body);

    const hashedPassword = await hash(data.password, 12);

    const student = await prisma.student.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        phoneNo: data.phoneNo,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { student: { ...student, password: undefined } },
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
