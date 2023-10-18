export interface IUserRegister {
  email: string;
  password: string;
  full_name: string;
  url_img?: string;
}

export interface IResgitserResponse {
  success: boolean;
  message: string;
  status: number;
}
