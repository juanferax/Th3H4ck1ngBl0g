import BlogHomeView from "./views/BlogHomeView";
import { AuthenticationProvider } from "./context/authenticationReducer";
import { PostsProvider } from "./context/postsReducer";
import React, { useState } from "react";

export const LoginContext = React.createContext();

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
