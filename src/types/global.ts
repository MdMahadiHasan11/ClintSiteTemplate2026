/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TErrorDetails = {
  code: string;
  field: string;
  message: string;
};

export type TError = {
  data: {
    message: string;
    stack: string;
    errorMessage: {
      path: string;
      message: string;
    };
    success: boolean;
  };
  details: Array<TErrorDetails>;
  status: number;
};

export type TMeta = {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: true;
    hasPreviousPage: false;
  };
  timestamp: Date;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  metadata?: TMeta;
  success: boolean;
  message: string;
  statusCode?: number;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TArgsParam = Record<string, any>;

export interface ErrorSource {
  path: string;
  message: string;
}

export interface ErrorResponseData {
  status: boolean;
  message: string;
  errorSources: ErrorSource[];
  stack?: string;
}

export interface ErrorResponse {
  data: ErrorResponseData;
  status: boolean;
}

export type IImagePlatform = "imgbb" | "cloudinary" | "server" | "aws" | string;
export const I_IMAGE_PLATFORM_ARRAY = ["imgbb", "cloudinary", "server", "aws"];

export interface TFileDocument {
  id: string;
  mimetype: string;
  server_url?: string;
  filename?: string;
  originalUrl?: string;
  pre_url?: string;
  modifyFileName?: string;
  path?: string;
  url: string;
  durl?: string;
  fileUniqueId?: string;
  platform: IImagePlatform;
  file_type: string;
  cdn?: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  caption_title: string;
  thumb_image_size: ThumbImageSize;
  large_image_size: LargeImageSize;
  small_image_size: SmallImageSize;
  medium_image_size: MediumImageSize;
}

export interface ThumbImageSize {
  width: number;
  height: number;
}

export interface LargeImageSize {
  width: number;
  height: number;
}

export interface SmallImageSize {
  width: number;
  height: number;
}

export interface MediumImageSize {
  width: number;
  height: number;
}
