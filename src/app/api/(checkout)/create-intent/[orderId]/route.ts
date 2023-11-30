import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (
  request: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  console.log("heeloooo");
  const { orderId } = params;
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
  console.log(order);
  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100 * 100,
      currency: "myr",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(paymentIntent)

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { intentId: paymentIntent.id },
    });
    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        status: 200,
      }
    );
  } else {
    return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
      status: 404,
    });
  }
};
