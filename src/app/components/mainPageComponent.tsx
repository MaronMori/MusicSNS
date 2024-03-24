import { Menu_section } from "@/app/components/main_page_sections_/menu_section/menu_section";
import { Post_timeline_section } from "@/app/components/main_page_sections_/post_timeline_section/post_timeline_section";
import { Post_modal_page } from "@/app/components/post_modal_page/post_modal_page";
import { FC, useEffect, useState } from "react";
import { LoadingPage } from "@/app/components/tools/loading";
import { useAuth } from "@/app/components/provider/auth_provider";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../lib/FirebaseConfig";
import { SpotifyTokenProvider } from "@/app/components/provider/spotify_token_provider";
import { useRouter } from "next/navigation";
import { Search_timeline } from "@/app/components/main_page_sections_/search/search_timeline";
import { Settings_section } from "@/app/components/main_page_sections_/settings/settings_section";
import { Profile_section } from "@/app/components/profile/profile_section";

interface MainPageComponentProps {
  code: string;
}
export const MainPageComponent: FC<MainPageComponentProps> = ({ code }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("home");
  const { user: userAuth } = useAuth();
  const router = useRouter();

  const openModal = (): void => setShowModal(true);
  const closeModal = (): void => setShowModal(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!userAuth || !code) {
        return;
      }

      console.log("start API");
      setLoading(true);
      try {
        const response = await fetch("/api/spotifyAPI", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          router.push("/");
          return; // router.push後はこれ以上の処理を行わない
        }

        const data = await response.json();
        if (!userAuth) {
          console.error("User is not authenticated");
          return;
        }
        // トークンと現在の時刻＋有効期限を保存
        const currentTime = new Date().getTime();
        const expiresIn = data.expiresIn;
        const expireTime = currentTime + expiresIn * 1000;
        sessionStorage.setItem("spotifyAccessToken", data.accessToken);
        sessionStorage.setItem("spotifyRefreshToken", data.refreshToken);
        sessionStorage.setItem("tokenExpireTime", expireTime.toString());

        await updateDoc(doc(firestore, "users", userAuth.uid), {
          Songs: data.userSongs,
          NextURL: data.nextURL,
        });
      } catch (e) {
        console.log("Error during the API call or document update:", e);
        alert(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userAuth, code]);

  if (loading || !userAuth) {
    return <LoadingPage text={"Uploading your songs to server..."} />;
  }
  return (
    <SpotifyTokenProvider>
      <main>
        <div className="h-auto md:flex-col-reverse md:grid md:grid-cols-3">
          <div
            className={"md:h-svh z-50 bottom-0 md:top-0 md:sticky fixed w-full"}
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <Menu_section openModal={openModal} setPage={setPage} />
          </div>
          <section className={"h-auto"}>
            {page === "home" && <Post_timeline_section />}
            {page === "search" && <Search_timeline />}
            {page === "profile" && <Profile_section />}
            {page === "settings" && <Settings_section />}
          </section>

          <section className="md:flex hidden"></section>
          <Post_modal_page show={showModal} onClose={closeModal} />
        </div>
      </main>
    </SpotifyTokenProvider>
  );
};
