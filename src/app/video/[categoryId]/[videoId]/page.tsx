"use client";

import PlayVideo from "@/components/PlayVideo/PlayVideo";
import Recommended from "@/components/Recommended/Recommended";
import { useParams } from "next/navigation";

const Video = () => {
  const { categoryId, videoId } = useParams();

  return (
    <div className="bg-[#f9f9f9] p-[20px_2%] flex justify-between flex-wrap md:px-[5%] lg:px-[5%]">
      {videoId && <PlayVideo />}
      {categoryId && <Recommended />}
    </div>
  );
};

export default Video;
