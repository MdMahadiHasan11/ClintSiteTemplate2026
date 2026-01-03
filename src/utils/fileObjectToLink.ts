import config from "@/config";
import { TFileDocument } from "@/types";

export default function fileObjectToLink(
  src: TFileDocument | string | null | undefined,
) {
  let imageSrc;

  if (src && typeof src === "object" && "path" in src) {
    imageSrc = config.aws_cdn_url + "/" + src.path;
  } else if (src && typeof src === "object" && src.originalUrl) {
    imageSrc = src.originalUrl;
  } else if (src && typeof src === "object" && src.url) {
    imageSrc = src.url;
  } else if (typeof src === "string") {
    imageSrc = src;
  } else if (src) {
    imageSrc = src;
  } else {
    imageSrc = "/placeholder.png";
  }
  return imageSrc as string;
}
