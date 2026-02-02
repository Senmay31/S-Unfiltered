
// import { Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
// import Posts from ".pages/Posts";
// import SinglePost from "./pages/SinglePost";
// import About from "./pages/About";

// export default function App() {
//   return (
//     <>
//       <nav style={{ display: "flex", gap: "20px" }}>
//         <Link to="/">Home</Link>
//         <Link to="/posts">Posts</Link>
//         <Link to="/about">About</Link>
//       </nav>

//       <hr />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/posts" element={<Posts />} />
//         <Route path="/posts/:id" element={<SinglePost />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import NewPost from "./pages/NewPost";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<p>Page not found</p>} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <NewPost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

// import Login from "./auth/Login";

// function App() {
//   return <Login />;
// }

// export default App;


// export default function App() {
//   return (
//     <div className="h-screen bg-red-500 text-white flex items-center justify-center text-4xl">
//       Tailwind is working 🚀
//     </div>
//   );
// }