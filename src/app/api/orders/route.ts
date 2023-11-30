import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import STATUS from "@/constants/STATUS";
//CREATE ORDER
export const POST = async (req: NextRequest) => {
  try {
    let body = await req.json();
    if (body.paymentType === "CASH") {
      body = {
        ...body,
        status: "PREPARING" as STATUS,
      };
    }
    const order = await prisma.order.create({
      data: body,
    });
    return new NextResponse(JSON.stringify(order), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cafe = searchParams.get("cafe");
  const student = searchParams.get("student");
  try {
    const order = await prisma.order.findMany({
      where: {
        ...(cafe ? { cafeId: cafe as string } : {}),
        ...(student ? { studentId: student as string } : {}),
      },
      include: {
        cafe: {
          include: {
            loc: true,
          },
        },
        student: true,
      },
    });

    return new NextResponse(JSON.stringify(order), { status: 200 });
  } catch (err) {
    console.log(err);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
