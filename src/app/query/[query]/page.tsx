"use client";
import SearchCard from "@/components/SearchCard/SearchCard";
import { VideoItem } from "@/types";
import { getVideo } from "@/utils/apiService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const QueryPage = () => {
const { query } = useParams();
  const [, setError] = useState<null | string>(null);
  const [results, setResults] = useState<VideoItem[]>([]);

  const fetchData = async () => {
    const res = await getVideo(
      `/search?part=snippet&q=${query}&maxResults=20&type=video`
    );
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

return (
  <div className="flex flex-col gap-4">
    {results.map((item) => (
      <SearchCard item={item} key={item.id.videoId} />
    ))}
  </div>
);
};

export default QueryPage;
