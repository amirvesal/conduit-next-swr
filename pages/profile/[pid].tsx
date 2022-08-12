import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import useSWR, { useSWRConfig } from "swr";

import ArticleList from "../../components/article/ArticleList";
import CustomeImage from "../../components/common/CustomeImage";
import ErrorMessage from "../../components/common/ErrorMessage";
import Maybe from "../../components/common/Maybe";
import EditProfileButton from "../../components/profile/EditProfileButton";
import FollowUserButton from "../../components/profile/FollowUserButton";
import ProfileTab from "../../components/profile/ProfileTab";
import UserAPI from "../../lib/api/user";
import checkLogin from "../../lib/utils/checkLogin";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import fetcher from "../../lib/utils/fetcher";
import storage from "../../lib/utils/storage";

const Profile = ({ initialProfile }) => {
  const { mutate } = useSWRConfig();
  console.log("initial profile -------> ", initialProfile);

  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const { data: fetchedProfile, error: profileError } = useSWR(
    `${SERVER_BASE_URL}/profiles/${encodeURIComponent(String(pid))}`,
    fetcher,
    { fallbackData: initialProfile }
  );

  console.log("fetchedProfile ---------->    ", fetchedProfile);

  if (profileError) return <ErrorMessage message="Can't load profile." />;

  const { profile } = fetchedProfile || initialProfile;

  const { username, bio, image, following } = profile;

  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);
  const isUser = currentUser && username === currentUser?.username;

  const handleFollow = async () => {
    mutate(`${SERVER_BASE_URL}/profiles/${pid}`, UserAPI.follow(pid), {
      rollbackOnError: true,
      optimisticData: { profile: { ...profile, following: true } },
    });
  };

  const handleUnfollow = async () => {
    try {
      await mutate(
        `${SERVER_BASE_URL}/profiles/${pid}`,
        UserAPI.unfollow(pid),
        {
          rollbackOnError: true,
          optimisticData: { profile: { ...profile, following: false } },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-page">
      <div className="bg-base-300 p-6">
        <div className="row">
          <div className="flex flex-col justify-center items-center">
            <CustomeImage
              className="rounded-full w-24 image-full"
              src={image}
              alt="User's profile image"
            />
            <h4 className="font-bold text-2xl mt-3">{username}</h4>
            <p>{bio}</p>
            <EditProfileButton isUser={isUser} />
            <Maybe test={isLoggedIn}>
              <FollowUserButton
                isUser={isUser}
                username={username}
                following={following}
                follow={handleFollow}
                unfollow={handleUnfollow}
              />
            </Maybe>
          </div>
        </div>
      </div>

      <div className="row p-8 md:px-36">
        <div className="">
          <div className="mb-8">
            <ProfileTab profile={profile} />
          </div>
          <ArticleList />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { pid },
}) => {
  try {
    const { data: initialProfile } = await UserAPI.get(pid);

    return {
      props: { initialProfile },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default Profile;
