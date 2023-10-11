import { IUser } from "./IUser";

export type IAuth = {
  success: boolean;
  data: {  user: IUser; 
           access_token: string; 
           refresh_token: string };
  message: string;
  status: number;
};