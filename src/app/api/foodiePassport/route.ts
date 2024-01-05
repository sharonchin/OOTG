import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import STATUS from "@/constants/STATUS";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const student = searchParams.get("student");
  const active = searchParams.get("active");
  try {
    const foodieVoucher = await prisma.foodiePassport.findMany({
      where: {
        ...(active ? { status: true, studentId: student as string } : {}),
      },
    });

    return new NextResponse(JSON.stringify(foodieVoucher), { status: 200 });
  } catch (err) {
    console.log(err);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
