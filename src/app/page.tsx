"use client";
import VideoCard from "@/components/VideoCard/VideoCard";
import { SidebarToggleContext } from "@/context/SidebarContext/SidebarContext";
import { VideoItem } from "@/types";
import { getVideo } from "@/utils/apiService";
import { useContext, useEffect, useState } from "react";

const HomePage = () => {
  const { category } = useContext(SidebarToggleContext);

  const [data, setData] = useState<VideoItem[]>([]);

  const [, setError] = useState<null | string>(null);

  const fetchData = async () => {
    const res = await getVideo(
      `/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=72&videoCategoryId=${category}`
    );
    if (res.error) {
      setError(res.error.message);
    } else if (res.data?.items) {
      setData(res.data.items);
    } else {
      setError("No items found in the response.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-x-4 gap-y-8 mt-4">
      {data.map((item, index) => (
        <VideoCard item={item} key={index} />
      ))}
    </div>
  );
};

export default HomePage;
