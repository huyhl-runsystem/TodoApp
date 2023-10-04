import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

export interface IFormControl {
  errors?: FieldError | undefined;
  name?: string;
  children: any;

  // control?: any;
  // prefix?: ReactNode;
  // placeholder: string;
}