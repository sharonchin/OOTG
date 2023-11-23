import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/utils/connect";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const studentId = req.headers.get("X-USER-ID");

    if(!studentId){
        return getErrorResponse(
            401,"You are not logged in, please provide token to gain access"
        );
    }

    const student= await prisma.student.findUnique({where:{id:studentId}});

    return NextResponse.json({
        status:"success",
        data:{student:{...student,password:undefined}},
    });
}