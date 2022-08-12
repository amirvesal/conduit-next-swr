import React from "react";

import CustomeLink from "../common/CustomeLink";
import LoadingSpinner from "../common/LoadingSpinner";
import { usePageDispatch } from "../../lib/context/PageContext";
import useSWR from "swr";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import fetcher from "../../lib/utils/fetcher";
import ErrorMessage from "../common/ErrorMessage";

const Tags = () => {
  const setPage = usePageDispatch();
  const handleClick = React.useCallback(() => setPage(0), []);
  const { data, error } = useSWR(`${SERVER_BASE_URL}/tags`, fetcher);

  if (error) return <ErrorMessage message="Connot load popular tags..." />;
  if (!data) return <LoadingSpinner />;

  const { tags } = data;

  return (
    <div className="flex flex-col">
      {tags?.map((tag) => (
        <CustomeLink
          key={tag}
          href={`/?tag=${tag}`}
          as={`/?tag=${tag}`}
          className="tag-default tag-pill"
        >
          <span onClick={handleClick}>{tag}</span>
        </CustomeLink>
      ))}
    </div>
  );
};

export default Tags;
