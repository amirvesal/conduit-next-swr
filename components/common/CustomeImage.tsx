import {
  DEFAULT_PROFILE_IMAGE,
  DEFAULT_IMAGE_SOURCE,
} from "../../lib/utils/constant";
import handleBrokenImage from "../../lib/utils/handleBrokenImage";

interface CustomeImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CustomeImage = ({ alt, src, className }: CustomeImageProps) => {
  return (
    <img
      width={32}
      height={32}
      data-src={src}
      alt={alt}
      data-size="auto"
      src={src}
      className={className ? `${className} lazyload` : `lazyload`}
      onError={handleBrokenImage}
    />
  );
};

export default CustomeImage;
