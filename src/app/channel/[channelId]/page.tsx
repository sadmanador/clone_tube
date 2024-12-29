"use client";
import TabsComponent from "@/components/Tabs/Tabs";
import VideoCard from "@/components/VideoCard/VideoCard";
import { VideoItem } from "@/types";
import { getVideo } from "@/utils/apiService";
import { value_converter } from "@/utils/value_converter";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ChannelPage = () => {
  const { channelId } = useParams();

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [channelInfo, setChannelInfo] = useState<VideoItem | null>(null);

  const [, setError] = useState<null | string>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {channelInfo && (
        <>
          <div
            className="h-64 w-full rounded-lg mb-5"
            style={{
              backgroundImage: `url(${channelInfo.brandingSettings?.image?.bannerExternalUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="flex gap-4 items-center">
            <div className="basis-1/4">
              <img
                src={channelInfo.snippet.thumbnails.default.url}
                alt={channelInfo.snippet.title}
                className="w-14 h-14 md:w-40 md:h-40 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold">
                {channelInfo.snippet.title}
              </h1>
              <p>
                <span className="font-extrabold">
                  {channelInfo.snippet.customUrl} &bull;{" "}
                </span>
                <span>
                  {value_converter(channelInfo.statistics.subscriberCount)}{" "}
                  subscribers &bull;{" "}
                </span>
                <span>
                  {value_converter(channelInfo.statistics.viewCount)} videos
                  &bull;{" "}
                </span>
              </p>
              <p>
                {channelInfo.snippet.description.length > 50
                  ? `${channelInfo.snippet.description.substring(0, 50)}...`
                  : channelInfo.snippet.description}
                {channelInfo.snippet.description.length > 50 && (
                  <span
                    onClick={handleModalOpen}
                    className="text-blue-500 cursor-pointer"
                  >
                    more
                  </span>
                )}
              </p>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-3">
                Subscribe
              </button>
            </div>
          </div>
          <TabsComponent />
        </>
      )}

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Latest Video</h2>
        {videos.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
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

      {isModalOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Description</h3>
            <p className="py-4">{channelInfo?.snippet.description}</p>
            <div className="modal-action">
              <button className="btn" onClick={handleModalClose}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ChannelPage;
