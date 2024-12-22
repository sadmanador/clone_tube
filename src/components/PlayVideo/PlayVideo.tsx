import moment from "moment";
import { useEffect, useState } from "react";
import { VideoItem } from "@/types";
import { getVideo } from "@/utils/apiService";
import { value_converter } from "@/utils/value_converter";
import { useParams } from "next/navigation";

const PlayVideo = () => {
  const router = useParams();
  const { videoId } = router;
  const [apiData, setApiData] = useState<VideoItem | null>(null);
  const [channelData, setChannelData] = useState<VideoItem | null>(null);
  const [commentData, setCommentData] = useState<VideoItem[]>([]);
  const [, setError] = useState<null | string>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const fetchVideoData = async () => {
    try {
      const res = await getVideo(
        `/videos?part=snippet,statistics,contentDetails&id=${videoId}`
      );
      if (res.error) {
        setError(res.error.message);
      } else if (res.data?.items && res.data.items.length > 0) {
        setApiData(res.data.items[0]);
      } else {
        setError("No items found in the response.");
        setApiData(null);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  };

  const fetchChannelData = async () => {
    const res = await getVideo(
      `/channels?part=snippet,statistics,contentDetails&id=${apiData?.snippet.channelId}`
    );
    if (res.error) {
      setError(res.error.message);
    } else if (res.data?.items && res.data.items.length > 0) {
      setChannelData(res.data.items[0]);
    } else {
      setError("No items found in the response.");
      setChannelData(null);
    }

    const commentResponse = await getVideo(
      `/commentThreads?part=snippet,replies&maxResults=50&videoId=${videoId}`
    );

    if (commentResponse.error) {
      setError(commentResponse.error.message);
    } else if (commentResponse.data?.items) {
      setCommentData(commentResponse.data.items);
    } else {
      setError("No comments found.");
    }
  };

  useEffect(() => {
    if (videoId) fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchChannelData();
  }, [apiData]);



  return (
    <div className="md:col-span-2 flex flex-col space-y-4 w-full min-w-72">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        className="w-full aspect-video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <h3 className="text-xl font-semibold">{apiData?.snippet.title}</h3>

      <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
        <p>
          {value_converter(apiData?.statistics.viewCount || "0")} Views •{" "}
          {moment(apiData?.snippet.publishedAt).fromNow()}
        </p>
        <div className="flex space-x-6">
          <span className="flex items-center">
            <img src={"/assets/like.png"} alt="like" className="w-5 mr-2" />
            {value_converter(apiData?.statistics.likeCount || "0")}
          </span>
          <span className="flex items-center">
            <img src={"/assets/dislike.png"} alt="" className="w-5 mr-2" />
            25
          </span>
          <span className="flex items-center">
            <img src={"/assets/share.png"} alt="share" className="w-5 mr-2" />
            Share
          </span>
          <span className="flex items-center">
            <img src={"/assets/save.png"} alt="save" className="w-5 mr-2" />
            Save
          </span>
        </div>
      </div>

      <hr className="border-gray-300" />

      <div className="flex items-center space-x-4">
        <img
          src={channelData?.snippet.thumbnails.default.url}
          alt="channel"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <p className="text-lg font-medium">{apiData?.snippet.channelTitle}</p>
          <span className="text-gray-500 text-sm">
            {value_converter(channelData?.statistics.subscriberCount || "0")}{" "}
            Subscribers
          </span>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
          Subscribe
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">
          {isExpanded
            ? apiData?.snippet.description
            : `${apiData?.snippet.description.slice(0, 100)}...`}
          <button
            onClick={toggleExpand}
            className="ml-2 text-gray-700 underline hover:no-underline"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        </p>
        <hr className="border-gray-300" />
        <h4 className="text-gray-600 text-sm">
          {value_converter(apiData?.statistics.commentCount || "0")} Comments
        </h4>

        {commentData?.map((item, index) => (
          <div key={index} className="flex space-x-4">
            <img
              src={
                item.snippet?.topLevelComment?.snippet?.authorProfileImageUrl 
              }
              alt="author"
              className="w-9 h-9 rounded-full"
            />
            <div>
              <h3 className="text-sm font-medium">
                {item.snippet?.topLevelComment?.snippet?.authorDisplayName ||
                  "Unknown"}{" "}
                <span className="text-gray-500 text-xs font-light">
                  {moment(
                    item.snippet?.topLevelComment?.snippet?.updatedAt
                  ).fromNow()}
                </span>
              </h3>
              <p className="text-gray-700 text-sm text-pretty break-all">
                {item.snippet?.topLevelComment?.snippet?.textDisplay.slice(
                  0,
                  250
                ) || ""}
              </p>
              <div className="flex space-x-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center">
                  <img
                    src={"/assets/like.png"}
                    alt="like"
                    className="w-4 mr-1"
                  />
                  {value_converter(
                    item.snippet?.topLevelComment?.snippet?.likeCount || "0"
                  )}
                </span>
                <img
                  src={"/assets/dislike.png"}
                  alt="dislike"
                  className="w-4"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;
