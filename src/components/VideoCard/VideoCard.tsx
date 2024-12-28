import { VideoCardProps, VideoItem } from "@/types";
import { getVideo } from "@/utils/apiService";
import { parseYouTubeDuration } from "@/utils/duration_converter";
import { value_converter } from "@/utils/value_converter";
import { Avatar } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VideoCard: React.FC<VideoCardProps> = ({ item }) => {
  const [channelData, setChannelData] = useState<VideoItem | null>(null);
  const [videoDetails, setVideoDetails] = useState<null | {
    duration: string;
    viewCount: string;
  }>(null);
  const [, setError] = useState<null | string>(null);

  const fetchChannelData = async () => {
    const res = await getVideo(
      `/channels?part=snippet,contentDetails&id=${item?.snippet.channelId}`
    );

    if (res?.data?.items && res.data.items.length > 0) {
      setChannelData(res.data.items[0]);
    } else {
      setError("No channel data found.");
    }
  };

  const fetchVideoDetails = async () => {
    const res = await getVideo(
      `/videos?part=contentDetails,statistics&id=${
        item?.contentDetails.videoId || item?.id
      }`
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
    fetchChannelData();
  }, [item?.snippet.channelId]);

  useEffect(() => {
    fetchVideoDetails();
  }, [item?.contentDetails.videoId]);

  return (
    <Link
      href={`/video/${item.snippet.categoryId || "2"}/${
        item.contentDetails.videoId || item.id
      }`}
      className="card"
    >
      <div className="relative bg-gray-300 flex justify-center items-center">
        {/* Centering the image */}
        <img
          src={item?.snippet.thumbnails.medium.url}
          alt={item.snippet.title}
          className="object-cover w-full h-full"
        />
        {/* Ensuring the duration is always at the top */}
        <p className="text-white font-semibold absolute bottom-2 right-2 px-1 bg-[rgba(27,27,27,0.9)] rounded-md">
          {videoDetails?.duration
            ? parseYouTubeDuration(videoDetails.duration)
            : ""}
        </p>
      </div>
      <div className="flex gap-2 p-2">
        <div>
          <Avatar
            alt="channel Icon"
            src={channelData?.snippet.thumbnails?.default.url}
          />
        </div>
        <div>
          <h2 className="text-md font-semibold my-1">{item.snippet.title}</h2>
          <h3 className="text-sm font-semibold text-gray-600 my-1 ">
            {item.snippet.channelTitle}
          </h3>
          <p className="text-sm">
            {videoDetails?.viewCount
              ? `${value_converter(videoDetails.viewCount)} views •`
              : ""}
            {moment(item.snippet.publishedAt).fromNow()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
