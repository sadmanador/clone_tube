import { SidebarToggleContext } from "@/context/SidebarContext/SidebarContext";
import { VideoItem } from "@/types";
import { getVideo } from "@/utils/apiService";
import { value_converter } from "@/utils/value_converter";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const Feed = () => {
  const [data, setData] = useState<VideoItem[]>([]);
  const [, setError] = useState<null | string>(null);
  const { category } = useContext(SidebarToggleContext);

  const fetchData = async () => {
    const res = await getVideo(
      `/videos?part=snippet,statistics&chart=mostPopular&maxResults=72&videoCategoryId=${category}`
    );

    console.log("API Response:", res);
    if (res.error) {
      setError(res.error.message);
    } else if (!res.items) {
      setError("No items found in the response.");
      setData(res.data.items);
    } 
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  console.log("Data Response:", data);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-x-4 gap-y-8 mt-4">
      {data.map((item, index) => (
        <Link
          key={index}
          href={`video/${item.snippet.categoryId}/${item.id}`}
          className="card"
        >
          <Image
            width={400}
            height={300}
            className="w-full rounded-md"
            src={item?.snippet.thumbnails.medium.url}
            alt=""
          />
          <h2 className="text-lg font-semibold text-black my-1">
            {item.snippet.title}
          </h2>
          <h3 className="text-sm font-semibold text-gray-600 my-1">
            {item.snippet.channelTitle}
          </h3>
          <p className="text-sm">
            {value_converter(item.statistics.viewCount)} views &bull;{" "}
            {moment(item.snippet.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
