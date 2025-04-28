import axios from "axios";
import { Loader, Loader2, Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

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

export default function AnnotatedDeleteButton({
  id,
  setVideos,
}: {
  id: string;
  setVideos: Dispatch<SetStateAction<Video[]>>;
}) {
  const [ loading, setLoading ] = useState<boolean>(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/videos/${id}`);
      setVideos((prev) => prev.filter((video) => video.id !== res.data.id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button onClick={handleSubmit}>
      {loading ? <Loader className="animate-spin" /> : <Trash2Icon />}
    </button>
  );
}
