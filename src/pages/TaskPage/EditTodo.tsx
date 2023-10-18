import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { editTodoAsync, viewDetailTodoAsync } from "../../store/TodoReducer";
import { AppDispatch, RootState } from "../../store/store";
import FormControl from "../../components/Common/FormControl";
import { ITodo } from "../../interfaces/ITodo";
import { Controller, useForm } from "react-hook-form";
import "../../style/EditTodo.css";

interface EditTodoFormProps {
  todoId: string;
}

interface FormState {
  title: string;
  desc: string;
  status: number;
}

enum TodoStatus {
  Pending = 1,
  Doing = 2,
  Completed = 3,
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({ todoId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showEditForm, setShowEditForm] = useState(true);
  const { access_token } = useSelector((state: RootState) => state.login.data);
  const { _id } = useSelector((state: RootState) => state.login.data.user);

  const { watch, control, handleSubmit, formState } = useForm<FormState>({
    defaultValues: {
      title: "",
      desc: "",
      status: 1,
    },
  });
  const { errors } = formState;

  const { data, isLoading, success } = useSelector(
    (state: RootState) => state.todo
  );

  // useEffect(() => {
  //   dispatch(
  //     viewDetailTodoAsync({ accessToken: access_token, todoId, user_id: _id })
  //   );
  // }, [dispatch, access_token, todoId, _id]);

  const onFinish = (values: FormState) => {
    const { title, desc, status } = values;

    dispatch(
      editTodoAsync({
        accessToken: access_token,
        user_id: _id,
        todoId: todoId,
        title: title,
        desc: desc,
        status: status,
      })
    );
    message.success("Todo updated successfully!");
    setShowEditForm(true);
  };
  const a = watch();
  console.log(a);
  return (
    <Form
      className="edit-todo-form"
      onFinish={handleSubmit(onFinish)}
      initialValues={{
        title: "",
        desc: "",
        status: TodoStatus.Pending,
      }}
    >
      <FormControl name="title">
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input {...field} placeholder="title" />}
        ></Controller>
      </FormControl>
      <FormControl name="desc">
        <Controller
          name="desc"
          control={control}
          render={({ field }) => (
            <Input.TextArea {...field} placeholder="Desc" />
          )}
        ></Controller>
      </FormControl>

      <FormControl name="status">
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <select {...field} defaultValue={1}>
              <option value={1}>Pending</option>
              <option value={2}>Doing</option>
              <option value={3}>Completed</option>
            </select>
          )}
        ></Controller>
      </FormControl>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditTodoForm;
