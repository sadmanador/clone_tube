"use client";

import PlayVideo from "@/components/PlayVideo/PlayVideo";
import Recommended from "@/components/Recommended/Recommended";
import { useParams } from "next/navigation";

const Video = () => {
  const router = useParams();
  const { categoryId, videoId } = router;

  console.log(categoryId, videoId);

  return (
    <div className="bg-[#f9f9f9] p-[20px_2%] flex justify-between flex-wrap md:px-[5%] lg:px-[5%]">
      {videoId && <PlayVideo videoId={videoId} />}
      {categoryId && <Recommended categoryId={categoryId} />}
    </div>
  );
};

export default Video;
