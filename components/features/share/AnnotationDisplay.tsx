"use client";

import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface Annotation {
  id: string;
  time: number;
  text: string;
}

interface AnnotationDisplayProps {
  isViewModalOpen: boolean;
  setIsViewModalOpen: Dispatch<SetStateAction<boolean>>;
  viewAnnotation: Annotation | null;
}

export default function AnnotationDisplay({
  isViewModalOpen,
  setIsViewModalOpen,
  viewAnnotation,
}: AnnotationDisplayProps) {
  return (
    <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
      <DialogContent className="bg-white p-8 rounded-lg shadow-xl max-w-2xl">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Full Annotation
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 text-gray-800">
          <p className="whitespace-pre-line leading-relaxed">
            {viewAnnotation?.text}
          </p>
        </div>
        <DialogFooter className="mt-6 flex justify-end">
          <Button 
            variant="outline" 
            onClick={() => setIsViewModalOpen(false)}
            className="px-4 py-2"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
