import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

export interface IInputControl {
  errors?: FieldError;
  name: string;
  placeholder?: string;
  control: any;
  type?: string;
  prefix?: ReactNode;
}