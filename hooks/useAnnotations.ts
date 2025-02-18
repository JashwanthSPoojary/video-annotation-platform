// hooks/useAnnotations.ts
import { useState } from "react";
import axios from "axios";
import { Annotation } from "@/types/annotaion";

export function useAnnotations() {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [error, setError] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const handleApiError = (err: any, defaultMessage: string) => {
    console.error(defaultMessage, err);
    setError(err.response?.data?.error || "An unexpected error occurred.");
  };
  const annotationService = {
    create: (videoId: string, data: { time: number; text: string }) =>
      axios.post(`/api/videos/${videoId}/annotations`, data),
    update: (videoId: string, annotationId: string, data: { text: string }) =>
      axios.patch(`/api/videos/${videoId}/annotations/${annotationId}`, data),
    delete: (videoId: string, annotationId: string) =>
      axios.delete(`/api/videos/${videoId}/annotations/${annotationId}`),
  };

  const addAnnotation = (id: string, time: number, text: string) => {
    if (!text.trim()) {
      setError("Annotation text cannot be empty.");
      return;
    }
    const newAnnotation: Annotation = { id, time, text: text.trim() };
    setAnnotations([...annotations, newAnnotation]);
    setError("");
  };

  const deleteAnnotation = (index: number) => {
    setAnnotations(annotations.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingText("");
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingText(annotations[index].text);
  };

  const updateAnnotation = (index: number) => {
    if (!editingText.trim()) {
      setError("Annotation text cannot be empty.");
      return;
    }
    const updatedAnnotations = [...annotations];
    updatedAnnotations[index] = {
      ...updatedAnnotations[index],
      text: editingText.trim(),
    };
    setAnnotations(updatedAnnotations);
    setEditingIndex(null);
    setEditingText("");
    setError("");
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditingText("");
    setError("");
  };

  return {
    annotations,
    error,
    editingIndex,
    editingText,
    addAnnotation,
    deleteAnnotation,
    startEditing,
    updateAnnotation,
    cancelEditing,
    setEditingText,
    setAnnotations,
    handleApiError,
    annotationService,
    setError,
  };
}
