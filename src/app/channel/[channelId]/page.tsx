"use client";
import VideoCard from "@/components/VideoCard/VideoCard";
import { VideoItem } from "@/types";
import { getVideo } from "@/utils/apiService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ChannelPage = () => {
  const { channelId } = useParams();
  const [, setError] = useState<null | string>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [channelInfo, setChannelInfo] = useState<VideoItem | null>(null);


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

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Latest Video</h2>
        {videos.length > 0 ? (
          <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {videos.slice(0, 1).map((item, index) => (
              <VideoCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No videos available for this channel.</p>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold">Channel Videos</h2>
        {videos.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 justify-center">
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
