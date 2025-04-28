import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"


export async function GET(req:NextRequest,{params}:{params:Promise<{id:string}>}){
    const id = (await params).id;
    try {
        const videos = await prisma.video.findMany({
            where:{
                userId:id
            },
            include:{
                _count:{
                    select:{annotations:true}
                }
            }
        });
        return NextResponse.json({message:"annotation videos are fetched",videos});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"failed to fetch"});
    }
}