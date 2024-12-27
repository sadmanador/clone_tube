import React, { useEffect, useState } from "react";
import Link from "next/link";
import { value_converter } from "@/utils/value_converter";
import { getVideo } from "@/utils/apiService";
import { useParams } from "next/navigation";
import { VideoItem } from "@/types";
import moment from "moment";


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
      {apiData?.map((item, index) => {
        return (
          <Link
            href={`/video/${item?.snippet.categoryId}/${item?.id}`}
            key={index}
            className="flex justify-between mb-2"
          >
            <img
              src={item?.snippet.thumbnails.default.url}
              alt={item.snippet.title}
              className="w-[168px] h-[94px] object-cover rounded-md"
            />
            <div className="flex-1 pl-2">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium mb-1 line-clamp-2">
                  {item.snippet.title}
                </h4>
          
              </div>
              <p className="text-gray-500 text-xs">
                {item.snippet.channelTitle}
              </p>
              <p className="text-gray-500 text-xs">
                {value_converter(item.statistics.viewCount)} Views &bull;{" "}
                {moment(item?.snippet.publishedAt).fromNow()}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recommended;
