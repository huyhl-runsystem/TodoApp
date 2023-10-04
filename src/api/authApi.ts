import axios from "axios";
import { AuthResponse } from "../../src/authenticaton/auth";
import { UserLogin } from '../../src/store/authSlice';


export const loginUser = async (body: UserLogin): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    "https://todoapp-uit.vercel.app/api/auth/login",
    body
  );
  return response.data;
};