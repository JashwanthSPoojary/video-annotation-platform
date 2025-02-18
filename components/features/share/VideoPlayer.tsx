"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import ReactPlayer from "react-player";
import { usePlayerStore } from "@/stores/slices/usePlayerStore";
const ReactPlayerNoSSR = dynamic(() => import("react-player"), { ssr: false });

interface Video {
  id: string;
  title: string;
  link: string;
}
interface VideoPlayerProps {
  video: Video;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  const localPlayerRef = useRef<ReactPlayer>(null);
  const setPlayerRef = usePlayerStore((state) => state.setPlayerRef);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePauseOrEnded = () => {
    setIsPlaying(false);
  };
  useEffect(() => {
    setPlayerRef(localPlayerRef);
  }, [localPlayerRef]);

  return (
    <section className="flex-1">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold">
            {video.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            {video.link ? (
              <ReactPlayerNoSSR
                ref={localPlayerRef}
                url={video.link}
                controls
                width="100%"
                height="100%"
                onPlay={handlePlay}
                onProgress={(progress)=>setCurrentTime(progress.playedSeconds)}
                onEnded={handlePauseOrEnded}
                config={{
                  youtube: {
                    playerVars: { modestbranding: 1 },
                  },
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-center text-muted-foreground">
                  No video link provided.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
