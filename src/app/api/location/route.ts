import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const location = await prisma.location.findMany();

    return new NextResponse(JSON.stringify(location), { status: 200 });
  } catch (err) {
    console.error(err);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}
