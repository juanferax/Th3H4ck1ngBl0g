import { PostCard } from "./PostCard";
import { posts } from "../assets/posts";

export default {
  title: "Blog/PostCard",
  component: PostCard,
  tags: ["autodocs"],
};

export const LoggedIn = {
  args: {
    loggedIn: true,
    post: posts[0],
  },
};

export const LoggedOut = {
  args: {
    post: posts[0],
  },
};
