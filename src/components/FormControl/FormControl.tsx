import React from 'react';
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import { IFormControl } from "../../interfaces/IFormControl";


const  FormControl:React.FC<IFormControl> = ({
  name,
  // placeholder,
  errors,
  // control,
  // prefix,
  children
}) => {
  return (
    <Form.Item
      name={name ?? ''}
      hasFeedback
      validateStatus={errors ? "error" : ""}
      help={errors?.message}
    >
      {children}
      
    </Form.Item>
  );
}

export default FormControl