import React, { useEffect, useState } from "react";
import Link from "next/link";
import { value_converter } from "@/utils/value_converter";
import { getVideo } from "@/utils/apiService";


const Recommended = ({ categoryId }: { categoryId: string }) => {
  const [apiData, setApiData] = useState([]);
  const [, setError] = useState<null | string>(null);

  const fetchData = async () => {
    const res = await getVideo(
      `/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=12`
    );

    console.log("API Response:", res);
    if (res.error) {
      setError(res.error.message);
    } else if (!res.items) {
      setError("No items found in the response.");
      setApiData(res.data.items)
    } 
  };



  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="basis-[32%] flex flex-col w-full lg:basis-1/3">
      {apiData?.map((item, index) => (
        <Link
          href={`/video/${item?.snippet.categoryId}/${item?.id}`}
          key={index}
          className="flex justify-between mb-2"
        >
          <img
            src={item?.snippet.thumbnails.default.url}
            alt={item.snippet.title}
            className="w-1/2 object-cover"
          />
          <div className="flex-1 pl-2">
            <h4 className="text-sm font-medium mb-1 line-clamp-2">
              {item.snippet.title}
            </h4>
            <p className="text-gray-500 text-xs">{item.snippet.channelTitle}</p>
            <p className="text-gray-500 text-xs">
              {value_converter(item.statistics.viewCount)} Views
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
