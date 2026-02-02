// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav>
//       <Link to="/">Home</Link> | 
//       <Link to="/new">New Post</Link> |
//       <Link to="/login">Login</Link>
//     </nav>
//   );
// }

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function NavBar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="border-b p-4 flex justify-between">
      <Link to="/" className="font-bold">SMC Blog</Link>

      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/create">Create Post</Link>
            <button onClick={logout} className="text-red-500">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> 
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}