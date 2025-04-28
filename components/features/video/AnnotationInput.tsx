"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";

interface AnnotationInputProps {
  currentAnnotation: string;
  setCurrentAnnotation: (value: string) => void;
  handleAddAnnotation: () => Promise<void>;
  error: string;
  addLoading:boolean;
  setAddLoading:Dispatch<SetStateAction<boolean>>;
}

export function AnnotationInput({
  currentAnnotation,
  setCurrentAnnotation,
  handleAddAnnotation,
  error,
  addLoading,
  setAddLoading
}: AnnotationInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Add an annotation..."
          value={currentAnnotation}
          onChange={(e) => setCurrentAnnotation(e.target.value)}
          className="w-full border rounded-lg"
          disabled={addLoading}
        />
        {addLoading?
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        :
        <Button onClick={handleAddAnnotation} className="whitespace-nowrap">
        <Plus className="mr-2 h-4 w-4" />
        Add
      </Button>
      }
        <Button variant="outline" onClick={() => setIsModalOpen(true)} className="whitespace-nowrap">
          Open Editor
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Long Annotation Editor</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Enter your annotation..."
            value={currentAnnotation}
            onChange={(e) => setCurrentAnnotation(e.target.value)}
            className="w-full h-40 mt-4 border rounded p-2"
          />
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
