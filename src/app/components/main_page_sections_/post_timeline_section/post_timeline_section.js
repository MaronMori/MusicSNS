import {useEffect, useState} from "react";
import {collection, getDoc, getDocs, orderBy, query, doc} from "firebase/firestore";
import {firestore} from "../../../../../lib/FirebaseConfig";
import {Post_timeline} from "@/app/components/main_page_sections_/post_timeline_section/components/post_timeline";


export const Post_timeline_section = ({ searchTerm = ""}) => {
    const [ posts, setPosts ] = useState([]);

    const fetchPosts = async () => {
        const q = query(collection(firestore, "posts"), orderBy("create", "desc"));
        const querySnapshot = await getDocs(q);

        const postsWithUserData = await Promise.all(querySnapshot.docs.map(async (postDoc) => {
            // to convert Firestore timestamp object to Javascript object
            const timestamp = postDoc.data();
            const formattedDate = timestamp.create.toDate().toLocaleDateString("en-CA", { timeZone: "America/Toronto" })

            const userDataDoc = await getDoc(doc(firestore, "users", postDoc.data().userId));
            const userData = userDataDoc.data();

            return {
                id: postDoc.id,
                ...postDoc.data(),
                create: formattedDate,
                username: userData.username,
                userProfileImage: userData.profileImageUrl,
                userid: userData.userid
            };
        }))
        setPosts(postsWithUserData);
    }

    const handleRefreshTimeline = async () => {
        const querySnapshot = await getDocs(query(collection(firestore, "posts"), orderBy("create" , "desc")));
        const newPosts = [];
        querySnapshot.forEach((doc) => {
            newPosts.push({})
        })

        setPosts(newPosts)
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const displayedPosts = searchTerm
        ? posts.filter(post => post.text.toLowerCase().includes(searchTerm.toLowerCase()))
        : posts;

    return(
        <div className="py-6 container flex flex-col h-screen overflow-y-auto">
            <Post_timeline posts={displayedPosts}/>
        </div>
    );
}