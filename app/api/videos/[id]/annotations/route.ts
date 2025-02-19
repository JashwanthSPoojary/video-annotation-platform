import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAnnotationSchema } from "@/schemas/annotation";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const parsed = createAnnotationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { time, text } = parsed.data;
    const { id } = await params;

    const annotation = await prisma.annotation.create({
      data: {
        time,
        text: text.trim(),
        video: { connect: { id: id } },
      },
    });

    return NextResponse.json(annotation, { status: 201 });
  } catch (error) {
    console.error("Error creating annotation", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
