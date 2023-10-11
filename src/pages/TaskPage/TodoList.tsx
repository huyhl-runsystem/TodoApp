import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { viewAllTodoAsync } from "../../store/TodoReducer";
import { ITodo } from "../../interfaces/ITodo";
import { ITodoResponse } from "../../interfaces/ITodoResponse";


const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { access_token   } = useSelector(
    (state: RootState) => state.login.data  );

  const { _id } = useSelector(
    (state: RootState) => state.login.data.user );

  const { data } = useSelector(
    (state: RootState) => state.todo  );

  useEffect(() => {
    if (access_token) {
        dispatch(viewAllTodoAsync({ accessToken : access_token, _id: _id }));
      }
    }, [dispatch]);

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {data.to_dos.map((todo : ITodo) => (
        <li key={todo._id}>
          <strong>{todo.title}</strong>: {todo.desc} (Status: {todo.status})
        </li>
        ))}
      </ul>
    </div>


    // <div>
    //   <h1>Todo App</h1>
    //   <div>
    //     <input
    //       type="text"
    //       placeholder="Title"
    //       name="title"
    //       value={newTodo.title}
    //       onChange={handleInputChange}
    //     />
    //     <textarea
    //       placeholder="Description"
    //       name="desc"
    //       value={newTodo.desc}
    //       onChange={handleInputChange}
    //     />
    //     <button onClick={handleAddTodo} disabled={isLoading}>
    //       Add Todo
    //     </button>
    //   </div>
    //   <ul>
    //     {data.to_dos.map((todo) => (
    //       <li key={todo._id}>
    //         <strong>{todo.title}</strong>: {todo.desc}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default TodoList;