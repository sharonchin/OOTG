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
     
    if(body.deliveryOption === "DELIVERY"){
      const rider = await prisma.rider.findFirst({
        where: {
          status: true
        }
      })

      if(!rider) {
        return new NextResponse(
          JSON.stringify({ message: "No rider found!" }),
          { status: 500 }
        );
      }
  
      body = {
        ...body,
        riderId: rider?.id
      }

      const order = await prisma.order.create({
        data: body,
      });
      const updateRider = await prisma.rider.update({
        where: {
          id: rider?.id
        },
        data: {
          status: false
        }
      })

      return new NextResponse(JSON.stringify(order), { status: 201 });
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
  const complete = searchParams.get("completed");
  const active = searchParams.get("active");
  const rider = searchParams.get("rider");
  try {
    const order = await prisma.order.findMany({
      where: {
        ...(active ? { status: "PREPARING" as STATUS, cafeId: cafe as string } : {}),
        ...(cafe ? { cafeId: cafe as string } : {}),
        ...(rider ? { riderId: rider as string } : {}),
        ...(complete
          ? { status: "COMPLETED" as STATUS, studentId: student as string }
          : {}),
        ...(student ? { studentId: student as string } : {}),
        NOT: {
          status: "DRAFT" as STATUS,
        },
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
