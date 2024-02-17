import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

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

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const orderId = params.id;
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "COMPLETED",
      },
    });

    const student = await prisma.student.update({
      where: {
        id: order.studentId,
      },
      data: {
        completedOrder: { increment: 1 },
      },
    });

    if ((student.completedOrder as any) % 10 === 0) {
      const foodiePassport = await prisma.foodiePassport.create({
        data: {
          min_spend_amount: 0,
          capped_amount: 5,
          amount: 5,
          studentId: student.id,
        },
      });
    }

    if (order.deliveryOption === "DELIVERY") {
      const rider = await prisma.rider.update({
        where: {
          id: order.riderId as string,
        },
        data: {
          status: true,
        },
      });
    }
    return new NextResponse(JSON.stringify(order), { status: 200 });
  } catch (err) {
    console.log(err);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
