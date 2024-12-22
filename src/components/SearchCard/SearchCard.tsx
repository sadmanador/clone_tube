import { VideoCardProps } from '@/types';
import Link from 'next/link';
import React from 'react';

const SearchCard: React.FC<VideoCardProps> = ({video}) => {
    return (
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
    );
};

export default SearchCard;