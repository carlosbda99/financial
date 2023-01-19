import { Profile } from "../enums/profile";

export interface User {
  login: string;
  email: string;
  name: string;
  profiles: Profile[]
}