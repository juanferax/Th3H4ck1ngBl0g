import BlogHomeView from "./views/BlogHomeView";
import { PostsProvider } from "./context/postsReducer";

function App() {
  return (
    <div className="App">
      <PostsProvider>
        <BlogHomeView />
      </PostsProvider>
    </div>
  );
}

export default App;
