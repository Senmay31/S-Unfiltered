import { useEffect, useState } from "react";
import blogApi from "../apis/axios";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    blogApi.get("/users/me").then(res => setUser(res.data));
  }, []);

  if (!user) return <p>Loading...</p>;
  
  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-xl">{user.email}</h2>
    </div>
  );
}