import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export const Signup = () => {
  return (
    <div className="md:grid grid-cols-2">
      <div className="flex flex-grow place-items-center justify-center">
        <Auth type="signup" />
      </div>
      <div className="invisible md:visible">
        <Quote />
      </div>
    </div>
  );
};
