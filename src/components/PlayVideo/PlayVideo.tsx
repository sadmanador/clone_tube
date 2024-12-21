import moment from "moment";
import { useEffect, useState } from "react";

import { getVideo } from "@/utils/apiService";
import { value_converter } from "@/utils/value_converter";
import { useParams } from "next/navigation";

const PlayVideo = () => {
  const router = useParams();
  const { videoId } = router;

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [, setError] = useState<null | string>(null);

  const fetchVideoData = async () => {
    const res = await getVideo(
      `/videos?part=snippet,statistics,contentDetails&id=${videoId}`
    );
    if (res.error) {
      setError(res.error.message);
    } else if (!res.items) {
      setError("No items found in the response.");
      setApiData(res.data.items?.[0]);
    }
  };

  const fetchChannelData = async () => {
    const res = await getVideo(
      `/channels?part=snippet,statistics,contentDetails&id=${apiData?.snippet.channelId}`
    );
    if (res.error) {
      setError(res.error.message);
    } else if (!res.items) {
      setError("No items found in the response.");
      setChannelData(res.data.items?.[0]);
    }

    const commentResponse = await getVideo(
      `/commentThreads?part=snippet,replies&maxResults=50&videoId=${videoId}`
    );

    console.log("comment",commentResponse)
    if (res.error) {
      setError(res.error.message);
    } else if (!res.items) {
      setError("No items found in the response.");
      setCommentData(commentResponse.data.items);
    }
  };

  useEffect(() => {
    if (videoId) fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchChannelData();
  }, [apiData]);

  console.log(commentData)

  return (
    <div className="basis-2/3 flex flex-col space-y-4">
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
          {value_converter(apiData?.statistics.viewCount)} Views •{" "}
          {moment(apiData?.snippet.publishedAt).fromNow()}
        </p>
        <div className="flex space-x-6">
          <span className="flex items-center">
            <img src={"/assets/like.png"} alt="like" className="w-5 mr-2" />
            {value_converter(apiData?.statistics.likeCount)}
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
            {value_converter(channelData?.statistics.subscriberCount)}{" "}
            Subscribers
          </span>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
          Subscribe
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">
          {apiData?.snippet.description.slice(0, 250)}
        </p>
        <hr className="border-gray-300" />
        <h4 className="text-gray-600 text-sm">
          {value_converter(apiData?.statistics.commentCount)} Comments
        </h4>

        {commentData?.map((item, index) => (
          <div key={index} className="flex space-x-4">
            <img
              src={
                item.snippet.topLevelComment.snippet.authorProfileImageUrl ||
                "/assets/jack.png"
              }
              alt="author"
              className="w-9 h-9 rounded-full"
            />
            <div>
              <h3 className="text-sm font-medium">
                {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                <span className="text-gray-500 text-xs font-light">
                  {moment(
                    item.snippet.topLevelComment.snippet.updatedAt
                  ).fromNow()}
                </span>
              </h3>
              <p className="text-gray-700 text-sm">
                {item.snippet.topLevelComment.snippet.textDisplay}
              </p>
              <div className="flex space-x-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center">
                  <img src={'/assets/like.png'} alt="like" className="w-4 mr-1" />
                  {value_converter(
                    item.snippet.topLevelComment.snippet.likeCount
                  )}
                </span>
                <img src={'/assets/dislike.png'} alt="dislike" className="w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;
