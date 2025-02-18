"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePlayerStore } from "@/stores/slices/usePlayerStore";
import { useAnnotations } from "@/hooks/useAnnotations";
import AnnotationDisplay from "./AnnotationDisplay";
import { Annotation, AnnotationsPanelProps } from "@/types/annotaion";

export function AnnotationsPanel({
  initialAnnotations,
}: AnnotationsPanelProps) {
  const highlightTolerance = 1;
  const playerRef = usePlayerStore((state) => state.playerRef);
  const currentTime = usePlayerStore((state) => state.currentTime);

  const [viewAnnotation, setViewAnnotation] = useState<Annotation | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const {
    annotations,
    setAnnotations,
  } = useAnnotations();

  const truncateText = (
    text: string,
    maxLength: number = 100
  ): React.ReactNode => {
    if (text.length > maxLength) {
      return (
        <>
          {text.slice(0, maxLength)}
          <span className="text-red-400 font-extrabold tracking-wider ml-1">
            ...
          </span>
        </>
      );
    }
    return text;
  };

  useEffect(() => {
    setAnnotations([...initialAnnotations]);
  }, []);

  return (
    <section className="flex-1">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Annotations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto">
            <ul className="space-y-2 px-5">
              {annotations.map((annotation, index) => {
                const isActive =
                  Math.abs(annotation.time - currentTime) <= highlightTolerance;
                return (
                  <li
                    key={annotation.id}
                    className={`flex items-center gap-2 p-2 border rounded group  ${
                      isActive ? "bg-green-100" : ""
                    }`}
                  >
                    <span
                      className="font-mono cursor-pointer text-blue-500 hover:underline"
                      onClick={() => {
                        if (playerRef?.current) {
                          playerRef.current.seekTo(annotation.time, "seconds");
                        }
                      }}
                    >
                      {formatTime(annotation.time)}
                    </span>

                    <span className="flex-1">
                      {annotation.text.length > 100
                        ? truncateText(annotation.text)
                        : annotation.text}
                    </span>
                    {annotation.text.length > 100 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setViewAnnotation(annotation);
                          setIsViewModalOpen(true);
                        }}
                      >
                        View More
                      </Button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </CardContent>
      </Card>
      <AnnotationDisplay
        isViewModalOpen={isViewModalOpen}
        setIsViewModalOpen={setIsViewModalOpen}
        viewAnnotation={viewAnnotation}
      />
    </section>
  );
}
