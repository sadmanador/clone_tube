"use client";

import PlayVideo from "@/components/PlayVideo/PlayVideo";
import Recommended from "@/components/Recommended/Recommended";
import { useParams } from "next/navigation";

const Video = () => {
  const { categoryId, videoId } = useParams();

  return (
    <div className=" grid lg:grid-cols-3 gap-3 ">
      {videoId && <PlayVideo />}
      {categoryId && <Recommended />}
    </div>
  );
};

export default Video;
