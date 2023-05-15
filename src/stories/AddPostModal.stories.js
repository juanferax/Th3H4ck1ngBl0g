import { AddPostModal } from "./AddPostModal";

export default {
  title: "Blog/AddPostModal",
  component: AddPostModal,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    postInfo: {
      title: "",
      public: false,
      content: "",
    },
  },
};

export const MissingData = {
  args: {
    postInfo: {
      title: "",
      public: false,
      content: "",
    },
    missingData: true,
  },
};
