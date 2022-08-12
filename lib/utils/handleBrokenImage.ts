import { SyntheticEvent } from "react";
import { DEFAULT_PROFILE_IMAGE } from "./constant";

const handleBrokenImage = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = DEFAULT_PROFILE_IMAGE;
  e.currentTarget.onerror = null;
};

export default handleBrokenImage;
