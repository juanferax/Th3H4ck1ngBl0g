import BlogHomeView from "./views/BlogHomeView";
import { AuthenticationProvider } from "./context/authenticationReducer";
import { PostsProvider } from "./context/postsReducer";
import "./assets/style/main.css";

function App() {
  return (
    <div className="App">
      <AuthenticationProvider>
        <PostsProvider>
          <BlogHomeView />
        </PostsProvider>
      </AuthenticationProvider>
    </div>
  );
}

export default App;
