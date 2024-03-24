import { Avatar, CircularProgress, Typography } from "@mui/material";
import { useUserProfileInfo } from "@/app/components/provider/user_profile_info_provider";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/components/provider/auth_provider";
import { firestore } from "../../../../lib/FirebaseConfig";
import {
  collection,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { Post_timeline } from "@/app/components/main_page_sections_/post_timeline_section/components/post_timeline";

export const Profile_section = () => {
  const { userProfileInfo } = useUserProfileInfo();
  const profileImage = userProfileInfo.profileImageUrl;
  const profileBio = userProfileInfo.bio;
  const username = userProfileInfo.username;
  const userID = userProfileInfo.userID;
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const uid = user.uid;

  const getUserPosts = async (uid: string) => {
    try {
      const q = query(
        collection(firestore, "posts"),
        where("userId", "==", uid),
        orderBy("create", "desc"),
      );
      const querySnapShot = await getDocs(q);
      return querySnapShot;
    } catch (error) {
      alert(error + "userIdと同じpostsが見つかりませんでした。");
      return false;
    }
  };

  const createUserPosts = async (
    snapshot: QuerySnapshot,
    username: string,
    userProfileImage: string,
    userid: string,
  ) => {
    const postsWithUserData = await Promise.all(
      snapshot.docs.map(async (postDoc) => {
        const timestamp = postDoc.data();
        const formattedDate = timestamp.create
          .toDate()
          .toLocaleDateString("en-CA", { timeZone: "America/Toronto" });

        return {
          id: postDoc.id,
          ...postDoc.data(),
          create: formattedDate,
          username: username,
          userid: userid,
          userProfileImage: userProfileImage,
        };
      }),
    );
    setUserPosts(postsWithUserData);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (uid) {
        const snapshot = await getUserPosts(uid);
        if (snapshot) {
          await createUserPosts(snapshot, username, profileImage, uid);
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, [uid]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  return (
    <div>
      <div className={"mx-auto pt-8 md:px-4"}>
        <div>
          <div className={"flex gap-x-5 px-4 md:px-0"}>
            <Avatar
              src={profileImage}
              alt={username}
              sx={{ width: "100px", height: "100px" }}
            />
            <div className={"flex items-center"}>
              <div className={""}>
                <p className={"text-4xl font-bold"}>{username}</p>
                <p className={"text-3xl"}>{userID}</p>
              </div>
            </div>
          </div>
          <div className={"pt-3 md:pt-10 px-4 md:px-0"}>
            <div>
              <Typography variant={"body1"}>{profileBio}</Typography>
            </div>
            <div></div>
          </div>
        </div>
        <div className="w-full">
          {isLoading ? (
            <div className={"h-dvh flex justify-center mt-40"}>
              <CircularProgress />
            </div>
          ) : userPosts[0] !== undefined ? (
            <Post_timeline posts={userPosts} />
          ) : (
            <div>No Posts</div>
          )}
        </div>
      </div>
    </div>
  );
};
