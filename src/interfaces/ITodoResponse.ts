import { ITodo } from "./ITodo";

export interface ITodoResponse {
  success: boolean;
  data: {
    to_dos: ITodo[];
    total: number;
  };
  message: string;
  status: number;
}
