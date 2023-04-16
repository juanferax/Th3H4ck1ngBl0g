import { Header } from "./BlogHeader";

export default {
  title: "Blog/Header",
  component: Header,
  tags: ["autodocs"],
};

export const LoggedIn = {
  args: {
    loggedIn: true,
    username: "Juanferax",
    role: "Admin",
  },
};

export const LoggedOut = {};
