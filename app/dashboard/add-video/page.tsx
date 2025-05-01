"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { createVideoSchema } from "@/schemas/annotation";
import { Loader } from "lucide-react";

export default function AddVideoPage() {
  const [videoLink, setVideoLink] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const validateYouTubeLink = async (link: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(
          link
        )}&format=json`
      );
      return response.ok;
    } catch (err) {
      return false;
    }
  };

  const handleAddVideo = async () => { 
    try {
      setLoading(true);
      setError("");
      const parsed = createVideoSchema.safeParse({ videoLink, videoTitle });
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      setError(errors.videoLink?.[0] || errors.videoTitle?.[0] || "Validation error");
      return;
    }
    const isValidVideo = await validateYouTubeLink(videoLink);
    console.log(isValidVideo);
    if (!isValidVideo) {
      setError(
        "Invalid YouTube video link. Please check the URL and try again."
      );
      return;
    }
    const res = await axios.post("/api/videos",{
      videoLink, videoTitle
    });
    const videoId=res.data.id;
    if(res.status===201){
      router.push(
        `/video/${videoId}`
      );
    }
    } catch (error) {
      setError("Failed to add video")
      console.log(error);
    }finally{
      setLoading(false);
    }
    };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add a Video to Annotate</CardTitle>
          <CardDescription>Enter a YouTube video link</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddVideo();
            }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="videoLink">Video Link</Label>
                <Input
                  id="videoLink"
                  placeholder="Enter YouTube URL"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoTitle">Video Title</Label>
                <Input
                  id="videoTitle"
                  placeholder="Enter video title"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
          <Button onClick={handleAddVideo}>{loading?<Loader className="animate-spin"/>:"Add Video"}</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
