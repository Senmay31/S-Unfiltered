
// export async function getPosts() {
//   const res = await fetch('http://localhost:3000/posts');
//   return res.json();
// }

import blogApi from "./axios";

export const getPosts = () => blogApi.get("/posts");
export const getPostById = (id) => blogApi.get(`/posts/${id}`);
export const createPost = (data) => blogApi.post("/posts", data);
export const likePost = (id) => blogApi.post(`/posts/${id}/like`);
export const addComment = (id, text) =>
  blogApi.post(`/posts/${id}/comments`, { text });