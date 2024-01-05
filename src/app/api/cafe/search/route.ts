import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  try {
    const cafe = await prisma.cafe.findMany({
      where: {
        OR: [
          {
            products: {
              some: {
                name: {
                  search: search as string,
                },
              },
            },
          },
          {
            name: {
              search: search as string,
            },
          },
          {
            loc: {
              is: {
                location: {
                  search: search as string,
                },
              },
            },
          },
        ],
      },
      include: {
        loc: true,
        Rating: true,
      },
    });

    return new NextResponse(JSON.stringify(cafe), { status: 200 });
  } catch (err) {
    console.log(err);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
