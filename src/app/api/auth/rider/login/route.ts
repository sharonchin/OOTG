import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import prisma from "@/utils/connect";
import { signJWT } from "@/lib/token";
import {
  LoginRiderInput,
  LoginRiderSchema,
} from "@/lib/validations/rider.schema";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LoginRiderInput;
    const data = LoginRiderSchema.parse(body);

    const rider = await prisma.rider.findUnique({
      where: { email: data.email },
    });
    if (!rider || !(await compare(data.password, rider.password))) {
      return getErrorResponse(401, "Invalid email or password");
    }

    const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

    const token = await signJWT(
      { sub: rider.userId },
      { exp: `${JWT_EXPIRES_IN}m` }
    );

    const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
    const cookieOptions = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };

    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        token,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: tokenMaxAge,
      }),

      // response.cookies.set({
      //   name: "X-USER-ID",
      //   value: rider.id,
      //   maxAge: tokenMaxAge,
      // }),
    ]);
    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }
    return getErrorResponse(500, error.message);
  }
}
