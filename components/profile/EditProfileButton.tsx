import React from "react";
import { CogIcon } from "@heroicons/react/outline";

import CustomeLink from "../common/CustomeLink";
import Maybe from "../common/Maybe";

interface EditProfileButtonProps {
  isUser: boolean;
}

const EditProfileButton = ({ isUser }: EditProfileButtonProps) => {
  return (
    <Maybe test={isUser}>
      <CustomeLink
        className="btn btn-outline ml-auto"
        href="/user/settings"
        as="/user/settings"
      >
        <CogIcon className="w-5 h-5" /> &nbsp;&nbsp;Edit Profile Settings
      </CustomeLink>
    </Maybe>
  );
};

export default EditProfileButton;
