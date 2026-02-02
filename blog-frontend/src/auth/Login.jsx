import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { loginUser } from "../apis/auth.js";
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
      const res = await loginUser({ email, password });
      login(res.data.token);
  };

  // const handleLogin = () => {
  //   login("test-token-123");
  // };


  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        onChange={(e) => setEmail({email:e.target.value})}
      />
      <input
        className="border p-2 w-full mb-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword({password:e.target.value})}
      />
      <button onClick={handleLogin} className="bg-black text-white w-full p-2">
        Login
      </button>
      <GoogleAuth />
      <Link to="/forgot" className="block text-center mt-2 text-sm">
        Forgot password?
      </Link>
    </div>
  );
}
