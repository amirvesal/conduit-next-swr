import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import useSWR, { useSWRConfig } from "swr";

import CustomeImage from "../common/CustomeImage";
import CustomeLink from "../common/CustomeLink";
import checkLogin from "../../lib/utils/checkLogin";
import {
  DEFAULT_PROFILE_IMAGE,
  SERVER_BASE_URL,
} from "../../lib/utils/constant";
import storage from "../../lib/utils/storage";

const CommentInput = () => {
  const { mutate } = useSWRConfig();
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const [content, setContent] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const handleChange = React.useCallback((e) => {
    setContent(e.target.value);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await axios.post(
      `${SERVER_BASE_URL}/articles/${encodeURIComponent(String(pid))}/comments`,
      JSON.stringify({
        comment: {
          body: content,
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${encodeURIComponent(currentUser?.token)}`,
        },
      }
    );
    setLoading(false);
    setContent("");
    mutate(`${SERVER_BASE_URL}/articles/${pid}/comments`);
  };

  if (!isLoggedIn) {
    return (
      <p>
        <CustomeLink className="link" href="/user/login" as="/user/login">
          Sign in
        </CustomeLink>
        &nbsp;or&nbsp;
        <CustomeLink className="link" href="/user/register" as="/user/register">
          sign up
        </CustomeLink>
        &nbsp;to add comments on this article.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form-control gap-4 input-group-lg border border-accent border-opacity-50 p-4 rounded-lg"
    >
      <div>
        <textarea
          rows={3}
          placeholder="Write a comment..."
          value={content}
          onChange={handleChange}
          disabled={isLoading}
          className="input  textarea textarea-bordered w-full h-full"
        />
      </div>
      <div className="flex justify-between items-center">
        <CustomeImage
          src={currentUser?.image ? currentUser?.image : DEFAULT_PROFILE_IMAGE}
          alt="Comment author's profile image"
          className="w-8 h-8 mask mask-circle"
        />
        <button className="btn btn-success" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
