import { ITodo } from "./ITodo";

export interface ITodoResponse {
    success: boolean;
    data: ITodo[];
    message: string;
    status: number;
  }