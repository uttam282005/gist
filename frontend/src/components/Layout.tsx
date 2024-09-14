import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config"; // Adjust the path to your config file
import { CurrentSessionContext, IsSignedInContext } from "../contexts";
import { UserDetails } from "../contexts";
import { Spinner } from "./Spinner";

function Layout() {
  const [sessionData, setSessionData] = useState<UserDetails | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();

  // Function to get user details
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/blog`, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });

        if (response.data.success) {
          setIsSignedIn(true);
          setSessionData(response.data.user);
          setIsLoading(false);
        } else {
          setIsSignedIn(false);
          setSessionData(null);
          setIsLoading(false);
          navigate("/signin"); // Redirect to signin if not authenticated
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsSignedIn(false);
        setIsLoading(false);
        navigate("/signin");
      } finally {
        setIsLoading(false);
      }
    }

    getUser();
  }, [navigate]); // Re-run the effect when the navigate function changes

  if (isLoading) return <Spinner/>

  return (
    <CurrentSessionContext.Provider value={sessionData}>
      <IsSignedInContext.Provider value={isSignedIn}>
        {/* This is where the child components will be rendered */}
        <div className="main-content">
          <Outlet /> 
        </div>

        {/* Add a footer if needed */}
      </IsSignedInContext.Provider>
    </CurrentSessionContext.Provider>
  );
}

export default Layout;
