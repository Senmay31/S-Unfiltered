// import { useEffect, useState } from "react";
// import { getPosts } from "./apis/posts";

// export default function Posts() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     getPosts().then((data) => setPosts(data));
//   }, []);

//   return (
//     <>
//       <h2>All Posts</h2>
//       <ul>
//         {posts.map((post) => (
//           <div key={post.id} style={{ marginBottom: "20px" }}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//           </div>
//         ))}
//       </ul>
//     </>
//   );
// }

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById, likePost, addComment } from "../apis/posts.js";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getPostById(id).then(res => setPost(res.data));
  }, []);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-2">{post.content}</p>

      <button
        onClick={() => likePost(post._id)}
        className="mt-4 border px-4 py-1"
      >
        ❤️ {post.likes.length}
      </button>

      <div className="mt-6">
        <h3 className="font-bold">Comments</h3>
        {post.comments.map((c) => (
          <p key={c._id} className="border-b py-1">{c.text}</p>
        ))}

        <input
          className="border p-2 w-full mt-2"
          placeholder="Add a comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={() => addComment(post._id, comment)}
          className="bg-black text-white px-4 py-1 mt-2"
        >
          Comment
        </button>
      </div>
    </div>
  );
}
