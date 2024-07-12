import { Heading } from "./Heading";
import { SubHeading } from "./SubHeading";
import { InputBox } from "./InputBox";
import { Button } from "./ButtonCom";
import { Error } from "./Error";
import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { UserSignInInput } from "@frumptious_clone/common";
import { Spinner } from "./Spinner";

export const Auth = ({ type, }: { type: "signin" | "signup" }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [input, setInput] = useState<UserSignInInput>({
    username: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        input
      );
      setLoading(false);
      const { token } = response.data;
      if (response.data.success && token) {
        localStorage.setItem("token", token);
        navigate("/blogs");
      } else {
        setError(true);
        seterrorMessage(response.data.message);
      }
    } catch (error) {
      setLoading(false)
      setError(true);
      seterrorMessage("Server error");
      console.error(error);
    }
  }

  return loading ? (<Spinner />) : (
    <div className="flex justify-center flex-col place-items-center" >
      {error && (
        <div className="mb-10">
          <Error message={errorMessage} />
        </div>
      )
      }
      <div className="place-items-center flex justify-center flex-col mb-2">
        <Heading
          content={type === "signup" ? "Create an account" : "Welcome back"}
        />
        <div className="flex justify-start">
          <SubHeading
            content={
              type === "signup"
                ? "Already have an account?"
                : "Don't have an account?"
            }
          />
          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className="text-md underline text-blue-700 pl-2"
          >
            {type === "signup" ? "Sign in" : "Sign up"}
          </Link>
        </div>
      </div>
      {
        type === "signup" && (
          <InputBox
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput({
                ...input,
                username: e.target.value,
              })
            }
            label={"Username"}
            placeholder={"Enter your username"}
          />
        )
      }
      <InputBox
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput({
            ...input,
            email: e.target.value,
          })
        }
        label={"Email"}
        placeholder={"Enter your email"}
      />
      <InputBox
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput({
            ...input,
            password: e.target.value,
          })
        }
        label={"Password"}
        placeholder={"Enter your password"}
      />
      <div className="mt-4">
        <Button
          onClick={sendRequest}
          label={loading ? "Loading..." : type === "signup" ? "Sign up" : "Sign in"}
        />
      </div>
    </div >
  )
};
