import { VideoCardProps, VideoItem } from "@/types";
import { getVideo } from "@/utils/apiService";
import { value_converter } from "@/utils/value_converter";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VideoCard: React.FC<VideoCardProps> = ({ item }) => {
  const [channelData, setChannelData] = useState<VideoItem | null>(null);
  const [, setError] = useState<null | string>(null);

  const fetchChannelData = async () => {
    const res = await getVideo(
      `/channels?part=snippet,statistics,contentDetails&id=${item?.snippet.channelId}`
    );
    if (res.error) {
      setError(res.error.message);
    } else if (res.data?.items && res.data.items.length > 0) {
      setChannelData(res.data.items[0]);
    } else {
      setError("No items found in the response.");
      setChannelData(null);
    }
  };

  useEffect(() => {
    fetchChannelData();
  }, [item]);

  return (
    <Link href={`video/${item.snippet.categoryId}/${item.id}`} className="card">
      <Image
        width={400}
        height={300}
        className="w-full rounded-md"
        src={item?.snippet.thumbnails.high.url}
        alt=""
      />
      <div className="flex gap-2 p-2">
        <div>
          <Image
            width={32}
            height={32}
            src={channelData?.snippet.thumbnails?.default.url || "/assets/jack.png"}
            alt="author"
            className="rounded-full w-auto h-9"
          />
        </div>
        <div>
          <h2 className="text-md font-semibold my-1">
            {item.snippet.title}
          </h2>
          <h3 className="text-sm font-semibold text-gray-600 my-1">
            {item.snippet.channelTitle}
          </h3>
          <p className="text-sm">
            {value_converter(item.statistics.viewCount)} views &bull;
            {moment(item.snippet.publishedAt).fromNow()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
