import React from "react";
import { useSWRConfig } from "swr";

import { getRage, getPageInfo } from "../../lib/utils/calculatePagination";
import { usePageState, usePageDispatch } from "../../lib/context/PageContext";
import Maybe from "./Maybe";

interface PaginationProps {
  total: number;
  limit: number;
  pageCount: number;
  currentPage: number;
  lastIndex: number;
  fetchURL: string;
}

const Pagination = ({
  total,
  limit,
  pageCount,
  currentPage,
  lastIndex,
  fetchURL,
}: PaginationProps) => {
  const { mutate } = useSWRConfig();
  const page = usePageState();
  const setPage = usePageDispatch();

  const { firstPage, lastPage, hasPreviousPage, hasNextPage } = getPageInfo({
    limit,
    pageCount,
    total,
    page: currentPage,
  });

  const pages = total > 0 ? getRage(firstPage, lastPage) : [];

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>, index: number) => {
      e.preventDefault();
      setPage(index);
      mutate(fetchURL);
    },
    []
  );

  const handleFirstClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setPage(0);
      mutate(fetchURL);
    },
    []
  );

  const handlePrevClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setPage(page - 1);
      mutate(fetchURL);
    },
    []
  );

  const handleNextClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setPage(page + 1);
      mutate(fetchURL);
    },
    []
  );

  const handleLastClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setPage(lastIndex);
      mutate(fetchURL);
    },
    []
  );

  return (
    <nav>
      <ul>
        <li onClick={handleFirstClick}>
          <a>{`<<`}</a>
        </li>
        <Maybe test={hasPreviousPage}>
          <a>{`<`}</a>
        </Maybe>

        {pages.map((page) => {
          const isCurrent = !currentPage ? page === 0 : page === currentPage;
          return (
            <li
              key={page.toString()}
              onClick={(e) => {
                handleClick(e, page);
              }}
            >
              <a>{page + 1}</a>
            </li>
          );
        })}
        <Maybe test={hasNextPage}>
          <li onClick={handleNextClick}>
            <a>{`>`}</a>
          </li>
        </Maybe>
        <li onClick={handleLastClick}>
          <a>{`>>`}</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
