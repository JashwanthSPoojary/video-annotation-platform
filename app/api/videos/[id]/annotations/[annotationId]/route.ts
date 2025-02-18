import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateAnnotationSchema } from "@/schemas/annotation";

type Props = {
  params: {
    id: string;
    annotationId: string;
  };
};

export async function PATCH(
  request: NextRequest,
  context: Props
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
    const annotation = await prisma.annotation.update({
      where: { id: context.params.annotationId },
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
  context: Props
) {
  try {
    const annotation = await prisma.annotation.delete({
      where: { id: context.params.annotationId },
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