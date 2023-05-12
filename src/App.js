import BlogHomeView from "./views/BlogHomeView";
import { PostsProvider } from "./context/postsReducer";
import "./assets/style/main.css";
import AuthenticationContext, {
  AuthenticationProvider,
} from "./context/AuthenticationContext";
import { useContext, useEffect } from "react";
import { db, firebaseAuth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

function App() {
  return (
    <div className="App">
      <AuthenticationProvider>
        <AppContent />
      </AuthenticationProvider>
    </div>
  );
}

function AppContent() {
  const { setLoggedIn, setUser } = useContext(AuthenticationContext);

  const checkForUser = () => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) return;
      if (user) {
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("uid", "==", user.uid));
        getDocs(q).then((querySnapshot) => {
          const formattedData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setUser(formattedData[0]);
        });
        setLoggedIn(true);
      }
    });
  };

  useEffect(() => {
    checkForUser();
  }, []);

  return (
    <PostsProvider>
      <BlogHomeView />
    </PostsProvider>
  );
}

export default App;
