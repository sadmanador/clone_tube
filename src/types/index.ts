import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface RequestError extends Error {
  status?: number;
  details?: unknown;
}

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
  duration: string; // e.g., PT2M20S
  dimension: string; // e.g., "2d"
  definition: string; // e.g., "hd"
  caption: string; // e.g., "true"
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

export interface VideoItem {
  id: string;
  snippet: {
    categoryId: string;
    title: string;
    channelTitle: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    publishedAt: string;
  };
  statistics: {
    viewCount: number;
  };
}
