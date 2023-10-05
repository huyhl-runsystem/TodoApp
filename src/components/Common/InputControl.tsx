import React from "react";
import { Controller } from "react-hook-form";
import { IInputControl } from "../../interfaces/IInputControl";
import { Form, Input } from "antd";

const InputController:React.FC<IInputControl> = ({
  name,
  control,
  placeholder,
  errors,
  type,
}) => {
  return (
    <Form.Item
      name={name}
      hasFeedback
      validateStatus={errors ? "error" : ""}
      help={errors?.message}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            type={type} placeholder={placeholder} {...field}
          />
        )}
      />
    </Form.Item>
  );
};

export default InputController;