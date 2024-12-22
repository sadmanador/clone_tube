import { ApiResponse, AxiosErrorType, VideoSearchResponse } from "@/types";
import { AxiosRequestConfig } from "axios";
import getInstance from "./axios";


const getRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const axiosInstance = getInstance();

  try {
    const response = await axiosInstance.get<T>(url, config);
    return { data: response.data };
  } catch (err) {
    const error = err as AxiosErrorType;
    const status = error.response?.status;
    const details = error.response?.data;

    return {
      error: {
        message: `Failed to fetch data from ${url}`,
        status,
        details,
        name: "",
      },
    };
  }
};


export const getVideo = async (
  endpoint: string
): Promise<ApiResponse<VideoSearchResponse>> => {
  const config: AxiosRequestConfig = {
    params: {
      key: process.env.NEXT_PUBLIC_API_KEY,
    },
  };

  return await getRequest<VideoSearchResponse>(endpoint, config);
};


