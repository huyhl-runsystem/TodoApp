import React from 'react';
import { Form } from "antd";
import { IFormControl } from "../../interfaces/IFormControl";

const FormControl:React.FC<IFormControl> = ({
  name,
  errors,
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