"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const info = await res.json();
    if (info.error) {
      return setError(info.error);
    }
    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        value={username}
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
      <p>{error}</p>
    </form>
  );
}
