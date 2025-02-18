import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateAnnotationSchema } from "@/schemas/annotation";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; annotationId: string } }
) {
  try {
    const body = await req.json();
    const parsed = updateAnnotationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { text } = parsed.data;
    const annotation = await prisma.annotation.update({
      where: { id: params.annotationId },
      data: { text: text.trim() },
    });
    return NextResponse.json(annotation, { status: 200 });
  } catch (error) {
    console.error("Failed to update annotation", error);
    return NextResponse.json(
      { error: "Failed to update annotation" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; annotationId: string } }
) {
  try {
    const annotation = await prisma.annotation.delete({
      where: { id: params.annotationId },
    });
    return NextResponse.json(annotation, { status: 200 });
  } catch (error) {
    console.error("Failed to delete annotation", error);
    return NextResponse.json(
      { error: "Failed to delete annotation" },
      { status: 500 }
    );
  }
}