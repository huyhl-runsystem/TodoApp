// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../store';
// import { toggleTodo, deleteTodo, setEditingTodoId } from '../../features/todo/todos';

// interface TodoListProps {}

// const TodoList: React.FC<TodoListProps> = () => {
//   const todos = useSelector((state: RootState) => state.todos.list);
//   const dispatch = useDispatch();

//   const startEditTodo = (id: number) => {
//     dispatch(setEditingTodoId(id));
//   };

//   return (
//     <ul>
//       {todos.map((todo) => (
//         <li key={todo.id}>
//           <input
//             type="checkbox"
//             checked={todo.completed}
//             onChange={() => dispatch(toggleTodo(todo.id))}
//           />
//           {todo.text}
//           <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
//           <button onClick={() => startEditTodo(todo.id)}>Edit</button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default TodoList;

import React from 'react'

export const TodoList = () => {
  return (
    <div>TodoList</div>
  )
}
