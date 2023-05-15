import { EditPostModal } from "./EditPostModal";

export default {
  title: "Blog/EditPostModal",
  component: EditPostModal,
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
