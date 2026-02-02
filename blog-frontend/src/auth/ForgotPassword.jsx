import { useState } from "react";
import { forgotPassword } from "../apis/auth.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = async () => {
    await forgotPassword(email);
    alert("Password reset link sent");
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-xl mb-4">Forgot Password</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-black text-white w-full p-2" onClick={submit}>
        Send Reset Link
      </button>
    </div>
  );
}