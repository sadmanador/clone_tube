import { VideoCardProps, VideoDetails } from "@/types";
import { getVideo } from "@/utils/apiService";
import { parseYouTubeDuration } from "@/utils/duration_converter";
import { value_converter } from "@/utils/value_converter";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RecommendationCard: React.FC<VideoCardProps> = ({ item }) => {
  const [, setError] = useState<null | string>(null);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);

  const fetchVideoDetails = async () => {
    const res = await getVideo(
      `/videos?part=contentDetails,statistics&id=${item?.id}`
    );

    if (res?.data?.items && res.data.items.length > 0) {
      const video = res.data.items[0];
      setVideoDetails({
        duration: video.contentDetails.duration,
        viewCount: video.statistics.viewCount,
      });
    } else {
      setError("No video details found.");
    }
  };

  useEffect(() => {
    fetchVideoDetails();
  }, [item?.id]);

  return (
    <Link
      href={`/video/${item?.snippet.categoryId}/${item?.id}`}
      className="flex justify-between mb-2"
    >
      <div className="relative">
        <img
          src={item?.snippet.thumbnails.default.url}
          alt={item.snippet.title}
          className="w-[168px] h-[94px] object-cover rounded-md"
        />
        {videoDetails?.duration && (
          <p className="text-white font-semibold absolute bottom-2 right-2 px-1 bg-[rgba(27,27,27,0.9)] rounded-md text-xs">
            {parseYouTubeDuration(videoDetails.duration)}
          </p>
        )}
      </div>
      <div className="flex-1 pl-2">
        <div className="flex justify-between">
          <h4 className="text-sm font-medium mb-1 line-clamp-2">
            {item.snippet.title}
          </h4>
        </div>
        <p className="text-gray-500 text-xs">{item.snippet.channelTitle}</p>
        <p className="text-gray-500 text-xs">
          {value_converter(item.statistics.viewCount)} Views &bull;{" "}
          {moment(item?.snippet.publishedAt).fromNow()}
        </p>
      </div>
    </Link>
  );
};

export default RecommendationCard;
