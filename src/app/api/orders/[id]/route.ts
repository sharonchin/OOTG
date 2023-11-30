import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    request: NextRequest,
    { params }: { params: { id: string } }
  ) => {
    try {
      const orderId = params.id;
      const order = await prisma.order.findUnique({
        where: {
          id: orderId,
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