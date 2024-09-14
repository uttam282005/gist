import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import Landing from "./pages/Landing";
import { FullBlog } from "./pages/FullBlog";
import Publish from "./pages/Publish";
import AboutPage from "./pages/About";
import { Profile } from "./components/Profile";
import { UpdateBlog } from "./pages/Update";
import Chat from "./pages/Chat";
import Layout from "./components/Layout"; // Import your Layout component

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Wrap all authenticated routes with the Layout component */}
          <Route element={<Layout />}>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<FullBlog />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/update/:id" element={<UpdateBlog />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          {/* Unauthenticated routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
