import { FieldError } from "react-hook-form";

export interface IFormControl {
  errors?: FieldError;
  name?: string;
  children: any;
}