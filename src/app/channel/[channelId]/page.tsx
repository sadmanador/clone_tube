"use client";
import React, { useEffect, useState } from "react";
import { VideoItem } from "@/types";
import { getVideo } from "@/utils/apiService";
import { useParams } from "next/navigation";
import VideoCard from "@/components/VideoCard/VideoCard";
import Image from "next/image";

const ChannelPage = () => {
  const { channelId } = useParams();
  const [, setError] = useState<null | string>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [channelInfo, setChannelInfo] = useState<VideoItem | null>(null);
  const [latestVideo, setLatestVideo] = useState<VideoItem | null>(null);

  const fetchChannelVideos = async () => {
    const channelRes = await getVideo(
      `/channels?part=snippet,brandingSettings,statistics,contentDetails&id=${channelId}`
    );
    if (channelRes.error) {
      setError(channelRes.error.message);
      return;
    }

    const channelData = channelRes.data?.items[0];
    setChannelInfo(channelData || null);

    const uploadsPlaylistId =
      channelData?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      setError("Uploads playlist not found.");
      return;
    }

    const playlistRes = await getVideo(
      `/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=20`
    );

    if (playlistRes.error) {
      setError(playlistRes.error.message);
    } else if (playlistRes.data?.items) {
      setVideos(playlistRes.data.items);
      setLatestVideo(playlistRes.data.items[0]);
    } else {
      setError("No videos found in the playlist.");
    }
  };

  useEffect(() => {
    if (channelId) fetchChannelVideos();
  }, [channelId]);

  return (
    <div>
      {channelInfo && (
        <div
          className="relative h-64 w-full"
          style={{
            backgroundImage: `url(${channelInfo.brandingSettings?.image?.bannerExternalUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute bottom-4 left-4 flex items-center gap-4">
            <img
              src={channelInfo.snippet.thumbnails.default.url}
              alt={channelInfo.snippet.title}
              className="w-16 h-16 rounded-full border-4 border-white"
            />
            <h1 className="text-white text-2xl font-bold">
              {channelInfo.snippet.title}
            </h1>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md">
              Subscribe
            </button>
          </div>
        </div>
      )}

      {latestVideo && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Latest Video</h2>
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="relative basis-1/2">
              <Image
                width={560}
                height={400}
                className="w-full rounded-md"
                src={latestVideo?.snippet.thumbnails.high.url}
                alt={latestVideo.snippet.title}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">
                {latestVideo.snippet.title}
              </h3>
              <p className="text-sm text-gray-600">
                {latestVideo.snippet.description.slice(0, 355)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-4">
        <h2 className="text-xl font-bold">Channel Videos</h2>
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {videos.map((item, index) => (
              <VideoCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No videos available for this channel.</p>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;