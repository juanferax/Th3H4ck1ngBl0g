import { HomeView } from "./BlogHomeView";
import { posts } from "../assets/posts";

export default {
  title: "Blog/HomeView",
  component: HomeView,
  tags: ["autodocs"],
};

export const LoggedIn = {
  args: {
    loggedIn: true,
    posts: posts,
  },
};

export const LoggedOut = {
  args: {
    posts: posts,
  },
};
