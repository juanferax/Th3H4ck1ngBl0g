import { LoginSignupModal } from "./LoginSignupModal";

export default {
  title: "Blog/LoginSignupModal",
  component: LoginSignupModal,
  tags: ["autodocs"],
};

export const Login = {
  args: {
    action: "login",
  },
};

export const SignUp = {
  args: {
    action: "signup",
  },
};
