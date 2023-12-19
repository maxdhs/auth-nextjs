import { fetchUser } from "@/lib/fetchUser.js";
import Link from "next/link";
import Logout from "./Logout.jsx";

export default async function Navbar() {
  const user = await fetchUser();
  return (
    <div className="navbar">
      <Link href={"/"}>Home</Link>
      <Link href={"/subreddits"}>Subreddits</Link>
      {user.id && (
        <>
          <Logout />
          <span>Welcome {user.username}</span>
        </>
      )}
      {!user.id && (
        <>
          <Link href={"/login"}>Login</Link>
          <Link href={"/register"}>Register</Link>
        </>
      )}
    </div>
  );
}
