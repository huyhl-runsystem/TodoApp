import React, { useEffect, useState } from "react";
import { Form, Button, Modal, Input } from "antd";
import { ITodo } from "../../interfaces/ITodo";
import "../../style/TodoForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodoAsync,
  editTodoAsync,
  viewAllTodoAsync,
} from "../../store/TodoReducer";
import { AppDispatch, RootState } from "../../store/store";
import { useForm } from "react-hook-form";
import EditTodoForm from "./EditTodo";

interface TodoFormProps {
  todo: ITodo;
}

interface FormState {
  title: string;
  desc: string;
  status: number;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { _id } = useSelector((state: RootState) => state.login.data.user);
  const { access_token } = useSelector((state: RootState) => state.login.data);

  const { control, handleSubmit, formState } = useForm<FormState>({
    defaultValues: {
      title: todo.title,
      desc: todo.desc,
      status: todo.status,
    },
  });

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    dispatch(deleteTodoAsync({ accessToken: access_token, todoId: todo._id }));
  };

  const onFinish = (values: FormState) => {
    const { title, desc, status } = values;
    dispatch(
      editTodoAsync({
        accessToken: access_token,
        user_id: _id,
        todoId: todo._id,
        title,
        desc,
        status,
      })
    );
  };

  return (
    <Form.Item>
      <div>
        <p>Title: {todo.title}</p>
        <p>Description: {todo.desc}</p>
        <p>Status : {todo.status}</p>

        <Button
          type="primary"
          onClick={handleEdit}
          style={{ marginRight: "10px" }}
        >
          Edit
        </Button>

        <Button
          className="danger-button"
          onClick={handleDelete}
          style={{ marginRight: "10px" }}
        >
          Delete
        </Button>
      </div>

      <Modal
        title="Edit Todo"
        visible={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
      >
        <EditTodoForm todoId={todo._id} />
      </Modal>
    </Form.Item>
  );
};

export default TodoForm;
