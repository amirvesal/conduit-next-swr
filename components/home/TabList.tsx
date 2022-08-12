import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import CustomeLink from "../common/CustomeLink";
import Maybe from "../common/Maybe";
import NavLink from "../common/NavLink";
import checkLogin from "../../lib/utils/checkLogin";
import storage from "../../lib/utils/storage";

const TabList = () => {
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);
  const router = useRouter();
  const {
    query: { tag, follow },
  } = router;

  if (!isLoggedIn) {
    return (
      <ul className="tabs">
        <li className={`tab tab-bordered ${!tag ? "tab-active" : ""}`}>
          <NavLink href="/" as="/">
            Global Feed
          </NavLink>
        </li>

        <Maybe test={!!tag}>
          <li className="tab tab-bordered tab-active">
            <CustomeLink href={`/?tag=${tag}`} as={`/tag=${tag}`}>
              <i /> {tag}
            </CustomeLink>
          </li>
        </Maybe>
      </ul>
    );
  }

  return (
    <ul className="tabs">
      <li className={`tab tab-bordered ${!tag && follow ? "tab-active" : ""}`}>
        <NavLink
          href={`/?follow=${currentUser?.username}`}
          as={`/?follow=${currentUser?.username}`}
        >
          Your Feed
        </NavLink>
      </li>

      <li className={`tab tab-bordered ${!tag && !follow ? "tab-active" : ""}`}>
        <NavLink href="/" as="/">
          Global Feed
        </NavLink>
      </li>

      <Maybe test={!!tag}>
        <li className="tab tab-bordered tab-active">
          <CustomeLink href={`?/tag=${tag}`} as={`?/tag=${tag}`}>
            <i /> {tag}
          </CustomeLink>
        </li>
      </Maybe>
    </ul>
  );
};

export default TabList;
