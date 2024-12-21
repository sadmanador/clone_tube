import { VideoItem } from "@/types";
import { getVideo } from "@/utils/apiService";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchResult = () => {
  const { query } = useParams();
  const [, setError] = useState<null | string>(null);
  const [results, setResults] = useState<VideoItem[]>([]);

  const fetchData = async () => {
    const res = await getVideo(
      `/search?part=snippet&q=${query}&maxResults=20&type=video`
    );

    console.log("API Response:", res);


    if (res.error) {
      setError(res.error.message);
    } else if (!res.data?.items) {
      setError("No items found in the response.");
    } else {
      setResults(res.data.items); 
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  console.log("thumbnails", results[0]);

  return (
    <div className="flex flex-col gap-4">
      {results.map((video) => (
        <Link
          href={`/video/${video?.snippet.categoryId}/${video?.id.videoId}`}
          key={video.id.videoId}
          className="flex gap-4 justify-start pr-4"
        >
          <div>
            <img
              className="rounded-md"
              style={{
                width: "500px",
                height: "281px",
              }}
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">{video.snippet.title}</h3>
            <p className="text-sm text-gray-600">
              {video.snippet.channelTitle}
            </p>
            <p className="text-sm text-gray-500">{video.snippet.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResult;
