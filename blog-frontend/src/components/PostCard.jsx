export default function PostCard({ post }) {
  return (
    <div className="border p-4 mb-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p>{post.content.substring(0, 100)}...</p>
    </div>
  );
}