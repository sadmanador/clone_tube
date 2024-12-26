import { VideoCardProps, VideoItem } from "@/types";
import { getVideo } from "@/utils/apiService";
import { Avatar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SearchCard: React.FC<VideoCardProps> = ({ item }) => {
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

  console.log(item);

  return (
    <Link
      href={`/video/${item?.snippet.categoryId || '24'}/${item?.id.videoId}`}
      key={item.id.videoId}
      className="md:flex gap-4 justify-center md:justify-start md:pr-4 px-[10%]"
    >
      <div className="basis-1/3">
        <Image
          width={item.snippet.thumbnails.high.width}
          height={item.snippet.thumbnails.high.height}
          src={item.snippet.thumbnails.high.url}
          alt={item.snippet.title}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col basis-2/3">
        <h3 className="text-lg font-medium">{item.snippet.title}</h3>

        <div className="flex gap-2">
          <div>
            <Avatar
              alt="channel Icon"
              src={channelData?.snippet.thumbnails?.default.url}
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-semibold">
              {item.snippet.channelTitle}
            </p>
            <p className="text-sm text-gray-500">{item.snippet.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
