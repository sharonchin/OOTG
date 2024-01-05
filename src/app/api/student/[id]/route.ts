import { getErrorResponse } from "@/lib/helpers";
import {
  UpdateStudentInput,
  UpdateStudentSchema,
} from "@/lib/validations/student.schema";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = params.id;
    const body = (await req.json()) as UpdateStudentInput;
    const data = UpdateStudentSchema.parse(body);

    const student = await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
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
    return getErrorResponse(500, error.message);
  }
}
