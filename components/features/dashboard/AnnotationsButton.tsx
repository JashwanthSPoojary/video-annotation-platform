"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface AnnotationsButtonProps{videoId:string}
export default function AnnotationsButton({videoId}:AnnotationsButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/video/${videoId}`);
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      View All Annotated Videos
    </Button>
  );
}
