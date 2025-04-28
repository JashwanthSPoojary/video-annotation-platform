"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
import axios from "axios";
import AnnotationsButton from "./AnnotationsButton";
import AnnotatedDeleteButton from "./AnnotationDeleteButton";
import { Loader } from "lucide-react";

interface Video {
  id: string;
  title: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  _count: {
    annotations: number;
  };
}


export default function AnnotatedVideosList({id}:{id:string}) {
  const [videos,setVideos] = useState<Video[]>([]);
  const [loading,setLoading] = useState<boolean>(true);
  useEffect(()=>{
    const fetchAnnotationVideos = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/api/videos/annotations/${id}`);
        setVideos(res.data.videos);        
      } catch (error) {
        console.log(error);
        
      }
      finally{
        setLoading(false);
      }
    } 
    fetchAnnotationVideos();
  },[]);
  if(loading){
    return <div className="flex justify-center items-center"><Loader className="animate-spin"/></div>
  }
    return (
      <Card>
  <CardHeader>
    <CardTitle>Your Annotated Videos</CardTitle>
    <CardDescription>View and manage your annotated videos</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="max-h-96 grid gap-4 overflow-y-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <div key={video.id} className="flex flex-col justify-between h-full p-4 border rounded-lg">
        <div className="flex-1">
          <h3 className="font-semibold text-base sm:text-lg truncate max-w-[200px] md:max-w-[250px]">
            {video.title}
          </h3>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm flex flex-col items-start gap-2">
            <p className="font-medium">{video._count.annotations} annotations</p>
            <AnnotationsButton videoId={video.id} />
          </div>
          <AnnotatedDeleteButton id={video.id} setVideos={setVideos}/>
        </div>
      </div>
      
      ))}
    </div>
  </CardContent>
</Card>


    )
  }