import React from "react";
import useSWR from "swr";

import CustomeLink from "./CustomeLink";
import Maybe from "./Maybe";
import NavLink from "./NavLink";
import { usePageDispatch } from "../../lib/context/PageContext";
import checkLogin from "../../lib/utils/checkLogin";
import storage from "../../lib/utils/storage";
import { APP_NAME } from "../../lib/utils/constant";

import { UserCircleIcon } from "@heroicons/react/solid";

const Navbar = () => {
  const setPage = usePageDispatch();
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);

  const [stickyClass, setStickyClass] = React.useState("relative");
  React.useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  });

  const stickNavbar = React.useCallback(() => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 200
        ? setStickyClass("sticky top-0 left-0 z-50")
        : setStickyClass("relative");
    }
  }, [stickyClass]);

  const handleClick = React.useCallback(() => setPage(0), []);

  return (
    <nav className={`${stickyClass}`}>
      <div className="navbar bg-base-100 drop-shadow-lg">
        <div className="flex-1">
          <CustomeLink href="/" as="/">
            <span
              className="btn btn-ghost normal-case text-xl"
              onClick={handleClick}
            >
              {APP_NAME}
            </span>
          </CustomeLink>
        </div>
        <div className="flex-none gap-5">
    
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <UserCircleIcon />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink href="/" as="/">
                  <span onClick={handleClick}>Home</span>
                </NavLink>
              </li>
              <Maybe test={isLoggedIn}>
                <li>
                  <NavLink href="/editor/new" as="/editor/new">
                    <i />
                    &nbsp;New Post
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/user/settings" as="/user/settings">
                    <i />
                    &nbsp;Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href={`/profile/${currentUser?.username}`}
                    as={`/profile/${currentUser?.username}`}
                  >
                    <span onClick={handleClick}>{currentUser?.username}</span>
                  </NavLink>
                </li>
              </Maybe>
              <Maybe test={!isLoggedIn}>
                <li>
                  <NavLink href="/user/login" as="/user/login">
                    Sign in
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/user/register" as="/user/register">
                    Sign up
                  </NavLink>
                </li>
              </Maybe>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
