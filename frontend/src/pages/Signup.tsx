import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export const Signup = () => {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <div className="w-full md:w-1/2">
        <Auth type="signup" />
      </div>
      <div className="hidden md:block w-1/2">
        <Quote />
      </div>
    </div>
  );
};
