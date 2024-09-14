import { createContext } from "react";

export interface UserDetails {
  username: string;
  id: string;
  post: [];
}

export const CurrentSessionContext = createContext<UserDetails | null>({
  username: "",
  id: "",
  post: [],
});

export const IsSignedInContext = createContext<boolean>(false);


