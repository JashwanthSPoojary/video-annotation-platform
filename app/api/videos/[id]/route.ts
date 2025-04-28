import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    try {
      const res = await prisma.video.delete({
        where: {
          id: id,
        },
        select: {
          id: true,
        },
      });
      return NextResponse.json({message:"Deleted successfull",id:res.id});
    } catch (error) {
      console.log(error);
      return NextResponse.json({error:"Failed to delete"});
    }
  }
  
  