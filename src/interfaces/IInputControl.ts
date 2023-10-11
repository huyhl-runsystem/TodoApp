import { ReactNode, ReactElement   } from "react";
import { FieldError, FieldValues } from "react-hook-form";

export interface IInputControl {
  errors?: FieldError;
  name: string;
  placeholder?: string;
  control: any;
  type?: string;
  prefix?: ReactNode;
  onBlur? : (e: React.FocusEvent<HTMLInputElement>) => void;
}