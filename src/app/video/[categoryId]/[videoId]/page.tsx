import React from "react";
import { useRouter } from "next/router";

const Video = () => {
  const router = useRouter();
  const { videoId, categoryId } = router.query;

  return (
    <div className="bg-[#f9f9f9] p-[20px_2%] flex justify-between flex-wrap md:px-[5%] lg:px-[5%]">
      {videoId && <PlayVideo videoId={videoId} />}
      {categoryId && <Recommended categoryId={categoryId} />}
    </div>
  );
};

export default Video;
