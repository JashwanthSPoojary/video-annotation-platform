"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatTime } from "@/lib/utils";
import { Plus, Edit, Trash, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { usePlayerStore } from "@/stores/slices/usePlayerStore";
import { useAnnotations } from "@/hooks/useAnnotations";
import {
  createAnnotationSchema,
  updateAnnotationSchema,
} from "@/schemas/annotation";
import { AnnotationInput } from "./AnnotationInput";
import AnnotationDisplay from "./AnnotationDisplay";
import { Annotation, AnnotationsPanelProps } from "@/types/annotaion";

export function AnnotationsPanel({
  videoId,
  initialAnnotations,
}: AnnotationsPanelProps) {
  const highlightTolerance = 1;
  const playerRef = usePlayerStore((state) => state.playerRef);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const currentTime = usePlayerStore((state) => state.currentTime);

  const [currentAnnotation, setCurrentAnnotation] = useState<string>("");
  const [viewAnnotation, setViewAnnotation] = useState<Annotation | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [loadingUpdateIndex, setLoadingUpdateIndex] = useState<number | null>(
    null
  );
  const [loadingDeleteIndex, setLoadingDeleteIndex] = useState<number | null>(
    null
  );
  const [addLoading, setAddLoading] = useState<boolean>(
    false
  );
  const {
    annotations,
    editingIndex,
    editingText,
    addAnnotation,
    deleteAnnotation,
    startEditing,
    updateAnnotation,
    cancelEditing,
    setEditingText,
    setAnnotations,
    annotationService,
    handleApiError,
    setError,
    error,
  } = useAnnotations();

  const handleAddAnnotation = async () => {
    if (!isPlaying) {
      setError("You must be playing the video to add annotations.");
      return;
    }
    if (!playerRef?.current || currentAnnotation.trim() === "") {
      setError("Player not available or annotation text is empty.");
      return;
    }

    const time = playerRef.current.getCurrentTime();
    if (!time && time !== 0) {
      setError("Could not get the current time from the player.");
      return;
    }

    try {
      setAddLoading(true);
      const data = {
        time,
        text: currentAnnotation.trim(),
      };
      const parsed = createAnnotationSchema.safeParse(data);
      if (!parsed.success) {
        // Extract a validation error message.
        setError(
          parsed.error.flatten().fieldErrors.text?.[0] ||
            "Invalid annotation data."
        );
        return;
      }
      const res = await annotationService.create(videoId, data);
      if (res.status === 201) {
        const savedAnnotation = res.data;
        // Update local state and clear error
        addAnnotation(
          savedAnnotation.id,
          savedAnnotation.time,
          savedAnnotation.text
        );
        setCurrentAnnotation("");
        setError("");
      } else {
        setError("Failed to add annotation. Please try again.");
      }
    } catch (err: any) {
      handleApiError(err, "Failed to add annotation");
    }
    finally{
      setAddLoading(false)
    }
  };

  const handleUpdateAnnotation = async (index: number) => {
    const annotation = annotations[index];
    if (!editingText.trim()) {
      setError("Annotation text cannot be empty.");
      return;
    }
    try {
      setLoadingUpdateIndex(index);
      const data = {
        text: editingText.trim(),
      };
      const parsed = updateAnnotationSchema.safeParse(data);
      if (!parsed.success) {
        setError(
          parsed.error.flatten().fieldErrors.text?.[0] ||
            "Invalid annotation data."
        );
        return;
      }
      const res = await annotationService.update(videoId, annotation.id, data);
      if (res.status === 200) {
        updateAnnotation(index);
        setError("");
      } else {
        setError("Failed to update annotation. Please try again.");
      }
    } catch (err: any) {
      handleApiError(err, "Failed to update annotation");
    } finally {
      setLoadingUpdateIndex(null);
    }
  };

  const handleDeleteAnnotation = async (index: number) => {
    const annotation = annotations[index];
    try {
      setLoadingDeleteIndex(index);
      const res = await annotationService.delete(videoId, annotation.id);
      if (res.status === 200) {
        deleteAnnotation(index);
        setError("");
      } else {
        setError("Failed to delete annotation. Please try again.");
      }
    } catch (err: any) {
      handleApiError(err, "Failed to delete annotation");
    } finally {
      setLoadingDeleteIndex(null);
    }
  };
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
          <AnnotationInput
            currentAnnotation={currentAnnotation}
            setCurrentAnnotation={setCurrentAnnotation}
            handleAddAnnotation={handleAddAnnotation}
            error={error}
            addLoading={addLoading}
           setAddLoading={setAddLoading}
          />
          <div className="max-h-96 overflow-y-auto">
            <ul className="space-y-2 px-5">
              {annotations.map((annotation, index) => {
                const isActive =
                  Math.abs(annotation.time - currentTime) <= highlightTolerance;
                return (
                  <li
                    key={annotation.id}
                    className={`flex items-center gap-2 p-2 border rounded group  ${
                      isActive ? "" : ""
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
                    {editingIndex === index ? (
                      <>
                        <Input
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="flex-1"
                          disabled={loadingUpdateIndex === index}
                        />
                        {loadingUpdateIndex === index ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleUpdateAnnotation(index)}
                          >
                            Save
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
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
                        <div className="hidden group-hover:flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEditing(index)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {loadingDeleteIndex === index ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteAnnotation(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
            
                        </div>
                      </>
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
