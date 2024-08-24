import { createContext } from "react";

export interface UserDetails {
  username: string;
  id: string;
  post: [];
}

export const CurrentSessionContext = createContext<UserDetails | undefined>({
  username: "",
  id: "",
  post: []
});


