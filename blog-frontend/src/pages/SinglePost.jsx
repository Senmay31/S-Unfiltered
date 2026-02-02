import { useParams } from "react-router-dom";

export default function SinglePost() {
  const { id } = useParams();

  return <h1>Post ID: {id}</h1>;
}