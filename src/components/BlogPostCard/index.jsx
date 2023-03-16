import React from "react";

function BlogPostCard({ post }) {
  return (
    <div className="border border-black rounded-md">
      <img
        className="rounded-t-md"
        src="https://media.istockphoto.com/id/1270770086/photo/commercial-buildings-view-from-low-angle.jpg?s=612x612&w=0&k=20&c=auL9cSRdLJjujIhq7anW0wZi_j-1EzFpv6OhvSBMQQY="
      />
      <div className="p-2">
        <h3 className="font-semibold text-xl"> {post.title} </h3>
        <div className="bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 h-2 w-5/6 my-1"></div>
        <div className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 h-2 w-3/5"></div>
        <p>
          <a href={"#/" + post.id} className="underline text-left w-full">
            Read more
          </a>{" "}
          →
        </p>
      </div>
    </div>
  );
}

export default BlogPostCard;
