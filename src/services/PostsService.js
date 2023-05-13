import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

export default function PostsService() {
  const getMyPosts = (uid) => {
    try {
      const postsCollectionRef = collection(db, "posts");
      const q = query(postsCollectionRef, where("author_uid", "==", uid));
      getDocs(q).then((querySnapshot) => {
        const formattedData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        console.log(formattedData);
        return formattedData;
      });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    getMyPosts,
  };
}
