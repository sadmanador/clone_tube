import { VideoItem } from "@/types";
import { getVideo } from "@/utils/apiService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RecommendationCard from "../RecommendationCard/RecommendationCard";

const Recommended = () => {
  const { categoryId } = useParams();
  const [apiData, setApiData] = useState<VideoItem[]>([]);
  const [, setError] = useState<null | string>(null);

  const fetchData = async () => {
    const res = await getVideo(
      `/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=12`
    );

    if (res.error) {
      setError(res.error.message);
    } else if (res.data?.items) {
      setApiData(res.data.items); // Ensure data.items is available
    } else {
      setError("No items found");
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

 

  return (
    <div className=" flex flex-col w-full lg:basis-1/3">
      {apiData?.map((item, index) => (
        <RecommendationCard key={index} item={item} />
      ))}
    </div>
  );
};

export default Recommended;
