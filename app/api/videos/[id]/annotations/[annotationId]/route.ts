import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateAnnotationSchema } from "@/schemas/annotation";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string; annotationId: string }> }
) {
  try {
    const body = await request.json();
    const parsed = updateAnnotationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { text } = parsed.data;
    const { annotationId } = await context.params;
    const annotation = await prisma.annotation.update({
      where: { id: annotationId },
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
  request: NextRequest,
  context: { params: Promise<{ id: string; annotationId: string }> }
) {
  try {
    const { annotationId } = await context.params;
    const annotation = await prisma.annotation.delete({
      where: { id: annotationId },
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
