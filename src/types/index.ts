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
        height: number;
        width: number;
        url: string;
      };
      default: {
        url: string;
      };
    };
    categoryId: string;
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

export interface SidebarContextProps {
  sidebar: boolean;
  setSidebar: (sidebar: boolean) => void;
  category: number;
  setCategory: (category: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export interface VideoCardProps {
  item: VideoItem;
}
