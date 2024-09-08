import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import Landing from "./pages/Landing";
import { FullBlog } from "./pages/FullBlog";
import Publish from "./pages/Publish";
import AboutPage from "./pages/About";
import { Profile } from "./components/Profile";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { CurrentSessionContext } from "./contexts";
import { useEffect, useState } from "react";
import { UserDetails } from "./contexts";
import { UpdateBlog } from "./pages/Update";

function App() {
  const [sessionData, setSessionData] = useState<UserDetails>();
  useEffect(() => {
    async function getUser() {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/blog`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      setSessionData(response.data.user);
    }
    getUser();
  }, [])
  return (
    <>
      <CurrentSessionContext.Provider value={sessionData}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blog/:id" element={<FullBlog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/update/:id" element={<UpdateBlog />} />
          </Routes>
        </BrowserRouter >
      </CurrentSessionContext.Provider>
    </>
  );
}

export default App;
