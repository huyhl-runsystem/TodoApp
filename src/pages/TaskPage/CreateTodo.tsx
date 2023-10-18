import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { createTodoAsync } from "../../store/TodoReducer";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import FormControl from "../../components/Common/FormControl";
import { ITodo } from "../../interfaces/ITodo";
import { useForm } from "react-hook-form";
import "../../style/CreateTodo.css";

interface TodoFormProps {
  todo: ITodo;
}

interface FormState {
  title: string;
  desc: string;
  status: number;
}

const CreateTodoForm: React.FC<TodoFormProps> = ({ todo }) => {
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const { access_token } = useSelector((state: RootState) => state.login.data);
  const { _id } = useSelector((state: RootState) => state.login.data.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  const onFinish = (values: any) => {
    const { title, desc, status } = values;
    dispatch(
      createTodoAsync({
        accessToken: access_token,
        user_id: _id,
        title,
        desc,
        status: Number(status),
      })
    );
    form.resetFields();
    message.success("Todo added successfully!");
    setShowForm(true);
  };

  return (
    <Form
      className="create-todo-form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        title: "",
        desc: "",
        status: todo.status,
      }}
    >
      <FormControl name="title">
        <Input />
      </FormControl>
      <FormControl name="desc">
        <Input.TextArea />
      </FormControl>

      <FormControl name="status">
        <select>
          <option value={1}>Pending</option>
          <option value={2}>Doing</option>
          <option value={3}>Completed</option>
        </select>
      </FormControl>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateTodoForm;
