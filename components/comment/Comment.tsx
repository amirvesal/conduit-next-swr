import React from "react";
import useSWR from "swr";
import Moment from "moment";

import CustomeLink from "../common/CustomeLink";
import CustomeImage from "../common/CustomeImage";
import Maybe from "../common/Maybe";
import DeleteButton from "./DeleteButton";
import checkLogin from "../../lib/utils/checkLogin";
import storage from "../../lib/utils/storage";

const Comment = ({ comment }) => {
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);
  const canModify =
    isLoggedIn && currentUser?.username === comment?.author?.username;

    console.log('log canMOdify -------> ',canModify);
    

  return (
    <div className="border border-primary border-opacity-50 rounded-lg my-8 flex flex-col gap-8 md:max-w-4xl mx-auto overflow-hidden">
      <div className="prose p-4 max-w-full ">
        <p>{comment.body}</p>
      </div>
      <div className="flex items-center bg-base-300 p-4">
        <CustomeLink
          href="/profile/[pid]"
          as={`/profile/${comment.author.username}`}
        >
          <CustomeImage
            src={comment.author.image}
            alt="Comment author's profile image"
            className="mask mask-circle"
          />
        </CustomeLink>
        &nbsp;
        <CustomeLink
          href="/profile/[pid]"
          as={`/profile/${comment.author.username}`}
          className="text-sm link-hover"
        >
          {comment.author.username}
        </CustomeLink>
        &nbsp;
        <span className="text-xs font-thin ">
          {Moment(comment.createdAt).format("dd-MMM-YYYY")}
        </span>
        <Maybe test={canModify}>
          <DeleteButton commentId={comment.id} />
        </Maybe>
      </div>
    </div>
  );
};

export default Comment;
