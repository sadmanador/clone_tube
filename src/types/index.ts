import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiResponse<T> {
  items?: T[];
  data?: T;
  error?: {
    message: string;
    status?: number;
    details?: Record<string, unknown>;
    name?: string;
  };
}

export interface AxiosErrorType {
  code?: string;
  config: AxiosRequestConfig;
  message: string;
  name: string;
  request?: XMLHttpRequest;
  response?: AxiosResponse;
  status?: number;
  stack?: string;
}

export interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    [key: string]: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface VideoDetails {
  etag: string;
  id: string;
  kind: string;
  snippet: VideoSnippet;
  statistics: VideoStatistics;
}

export interface VideoContentDetails {
  duration: string; 
  dimension: string;
  definition: string; 
  caption: string; 
  licensedContent: boolean;
}

export interface VideoWithContentDetails extends VideoDetails {
  contentDetails: VideoContentDetails;
}

export interface ChannelSnippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: {
    [key: string]: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface ChannelStatistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

export interface ChannelDetails {
  etag: string;
  id: string;
  kind: string;
  snippet: ChannelSnippet;
  statistics: ChannelStatistics;
  contentDetails: {
    relatedPlaylists: {
      [key: string]: string;
    };
  };
}

export interface CommentSnippet {
  channelId: string;
  videoId: string;
  topLevelComment: {
    id: string;
    snippet: {
      textOriginal: string;
      authorDisplayName: string;
      authorProfileImageUrl: string;
      likeCount: number;
      publishedAt: string;
    };
  };
  canReply: boolean;
  totalReplyCount: number;
}

export interface CommentThread {
  etag: string;
  id: string;
  kind: string;
  snippet: CommentSnippet;
}

export interface SearchResultSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    [key: string]: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface SearchResult {
  etag: string;
  id: {
    kind: string;
    videoId?: string;
    channelId?: string;
  };
  kind: string;
  snippet: SearchResultSnippet;
}

export type VideoList = VideoDetails[];

export interface SidebarContextProps {
  sidebar: boolean;
  setSidebar: (sidebar: boolean) => void;
  category: number;
  setCategory: (category: number) => void;
}

export interface RecommendedVideo {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    defaultAudioLanguage: string;
    description: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
    publishedAt: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      standard: {
        url: string;
        width: number;
        height: number;
      };
      maxres: {
        url: string;
        width: number;
        height: number;
      };
    };
    title: string;
  };
  statistics: {
    commentCount: string;
    favoriteCount: string;
    likeCount: string;
    viewCount: string;
  };
}

export interface RecommendedVideoResponse {
  items: RecommendedVideoResponse | undefined;
  data: {
    etag: string;
    items: RecommendedVideo[];
    kind: string;
    nextPageToken: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
  };
}

export interface CommentSnippet {
  authorChannelId: {
    value: string;
  };
  authorChannelUrl: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  canRate: boolean;
  channelId: string;
  likeCount: number;
  publishedAt: string; 
  textDisplay: string; 
  textOriginal: string; 
  updatedAt: string; 
  videoId: string;
  viewerRating: string; 
}

export interface TopLevelComment {
  etag: string;
  id: string;
  kind: string;
  snippet: CommentSnippet;
}



export interface VideoItem {
  id: {
    videoId: string;
  };
  snippet: {
    topLevelComment: TopLevelComment;
    title: string;
    description: string;
    channelTitle: string;
    channelId: string;
    publishedAt: string;
    thumbnails: {
      high: {
        url: string;
      };
      default: {
        url: string;
      };
    };
    categoryId: string; // Adding categoryId as it is used in the URL.
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
    subscriberCount: string;
  };
}

export interface VideoSearchResponse {
  items: VideoItem[];
}
