
// export default function Home() {
//   return <h1>Welcome to My Blog</h1>;
// }

// import { useEffect, useState } from 'react';
// import API from './apis/api';
// import { Link } from 'react-router-dom';

// export default function Home() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     API.get('/posts').then(res => setPosts(res.data));
//   }, []);

//   return (
//     <div>
//       <h1>All Posts</h1>
//       {posts.map(p => (
//         <div key={p._id}>
//           <h2><Link to={`/post/${p._id}`}>{p.title}</Link></h2>
//           <p>{p.excerpt}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getPosts } from "../apis/posts.js";
import PostCard from "../components/PostCard.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   getPosts(page).then(res => setPosts(res.data));
  // }, [page]);

  useEffect(() => {
    setPosts([
      { _id: 1, title: "Test Post", content: "This is a test" },
      { _id: 2, title: "Another Post", content: "Dummy content" },
      { _id: 3, title: "Yet Another Post", content: "More dummy content" },
      { _id: 4, title: "Another Post, Again!", content: "Still some more dummy content" },
    ]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
     <h2 className="text-2xl mb-4">All Posts</h2>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button> 
    </div>
  );
}