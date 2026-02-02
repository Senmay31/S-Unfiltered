import { useState } from "react";
import { signupUser } from "../apis/auth.js";

export default function Signup() {
    const [form, setForm] = useState({});

    const submit = async () => {
        await signupUser(form);
        alert("Successfully signed up. Please proceed to login.");
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <input
                className="border p-2 w-full mb-2"
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                className="border p-2 w-full mb-2"
                placeholder="Password"
                type="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button onClick={submit} className="bg-black text-white w-full p-2">
                Signup
            </button>
        </div>
    );
}