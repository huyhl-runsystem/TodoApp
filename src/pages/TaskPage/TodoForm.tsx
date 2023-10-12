import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { ITodo } from "../../interfaces/ITodo";
import FormControl from "../../components/Common/FormControl";
import "../../style/TodoForm.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoAsync, viewAllTodoAsync } from "../../store/TodoReducer";
import { AppDispatch, RootState } from "../../store/store";

interface TodoFormProps {
  todo: ITodo;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo}) => {
    const [showForm, setShowForm] = useState(true);
    const dispatch = useDispatch<AppDispatch>();

  const onFinish = (values: any) => {
    console.log("Received values:", values);
  };
  
  const { access_token  } = useSelector(
    (state: RootState) => state.login.data  );

  const handleDelete = () => {
    dispatch(deleteTodoAsync({ accessToken : access_token , todoId : todo._id}));
    setShowForm(false);
  };

  useEffect(() => {
    if(!showForm ){
        dispatch(deleteTodoAsync({accessToken: access_token, todoId: todo._id}));
    }
  }, [showForm, dispatch, todo._id]);
    if(!showForm){
        return null;
    }
  
  
  return (
    <Form
      name={`todo-form-${todo._id}`}
      onFinish={onFinish}
      initialValues={{
        title: todo.title,
        desc: todo.desc,
        status: todo.status,
      }}
    >
      <FormControl name="title" >
        <Input  />
      </FormControl>
      <FormControl name="desc" >
        <Input.TextArea  />
      </FormControl>
      
      <FormControl name="status">
        {/* <select value={todo.status} onChange={handleChange}> */}
        <select value={todo.status}>
        <option value={1}>Pending</option>
        <option value={2}>Doing</option>
        <option value={3}>Completed</option>
      </select>
      </FormControl>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>
          Submit
        </Button>

        <Button className="danger-button" htmlType="submit"  onClick={handleDelete}>
          Delete
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TodoForm;


