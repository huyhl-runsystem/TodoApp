import { User } from "./user";

export type AuthResponse = {
  success: boolean;
  data: { user: User; access_token: string; refresh_token: string };
  message: string;
  status: string;
};