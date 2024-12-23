import { SidebarToggleContext } from "@/context/SidebarContext/SidebarContext";
import { VideoItem } from "@/types";
import { getVideo } from "@/utils/apiService";
import { useContext, useEffect, useState } from "react";
import VideoCard from "../VideoCard/VideoCard";

const Feed = () => {
  const [data, setData] = useState<VideoItem[]>([]);
  
  const [, setError] = useState<null | string>(null);

  const { category } = useContext(SidebarToggleContext);

  const fetchData = async () => {
    const res = await getVideo(
      `/videos?part=snippet,statistics&chart=mostPopular&maxResults=72&videoCategoryId=${category}`
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

  
console.log("home", data)


  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-x-4 gap-y-8 mt-4">
      {data.map((item, index) => (
        <VideoCard item={item} key={index} />
      ))}
    </div>
  );
};

export default Feed;
