import { useState } from "react";
import { createPost } from "../apis/posts.js";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async () => {
    await createPost({ title, content });
    alert("Your post has been created");
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <input
        className="border-t-lime-500 p-2 w-full mb-2"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={submit} className="bg-blue-500 text-white w-full p-3">
        Create Post
      </button>
    </div>
  );
}