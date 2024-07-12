import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import { Landing } from "./pages/Landing";
import { FullBlog } from "./pages/FullBlog";
import { Publish } from "./pages/Publish";
import AboutPage from "./pages/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<FullBlog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;
