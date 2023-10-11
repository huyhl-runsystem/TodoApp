import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { viewAllTodoAsync } from "../../store/TodoReducer";


const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { access_token   } = useSelector(
    (state: RootState) => state.login.data
    
  );
  const { _id } = useSelector(
    (state: RootState) => state.login.data.user
    
  );
  const { data } = useSelector(
    (state: RootState) => state.todo
  );

  useEffect(() => {
    if (access_token) {
        dispatch(viewAllTodoAsync({ accessToken : access_token, _id: _id }));
      }
    }, [dispatch]);

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {data.map((todo) => (
          <li key={todo._id}>
            <strong>{todo.title}</strong>: {todo.desc} :{todo.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;