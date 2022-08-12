import React from "react";
import { useRouter } from "next/router";

import NavLink from "../common/NavLink";
import { usePageDispatch } from "../../lib/context/PageContext";

const ProfileTab = ({ profile }) => {
  const router = useRouter();

  const {
    query: { favorite },
  } = router;
  const setPage = usePageDispatch();
  return (
    <ul className="tabs">
      <li className={`tab tab-bordered ${!favorite && "tab-active"}`}>
        <NavLink
          href="/profile/[pid]"
          as={`/profile/${encodeURIComponent(profile.username)}`}
        >
          <span className="" onClick={() => setPage(0)}>
            My Articles
          </span>
        </NavLink>
      </li>
      <li className={`tab tab-bordered ${favorite && "tab-active"}`}>
        <NavLink
          href="/profile/[pid]?favorite=true"
          as={`/profile/${encodeURIComponent(profile.username)}?favorite=true`}
        >
          <span className="" onClick={() => setPage(0)}>
            Favotied Articles
          </span>
        </NavLink>
      </li>
    </ul>
  );
};

export default ProfileTab;
