// import React, { useState, useEffect } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { addTodo, editTodo, setEditingTodoId } from '../../features/todo/todos';
// import { RootState } from '../../store';

// interface TodoFormProps {}

// interface FormData {
//   text: string;
// }

// const TodoForm: React.FC<TodoFormProps> = () => {
//   const { register, handleSubmit, reset } = useForm<FormData>();
//   const dispatch = useDispatch();
//   const editingTodoId = useSelector((state: RootState) => state.todos.editingTodoId);
//   const editingTodo = useSelector((state: RootState) =>
//     state.todos.list.find((t) => t.id === editingTodoId)
//   );

//   const onSubmit: SubmitHandler<FormData> = (data) => {
//     if (editingTodo) {
//       dispatch(editTodo({ id: editingTodo.id, text: data.text }));
//     } else {
//       dispatch(addTodo(data.text));
//     }
//     reset();
//   };

//   useEffect(() => {
//     if (editingTodo) {
//       reset({ text: editingTodo.text });
//     }
//   }, [editingTodo, reset]);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register('text', { required: true })} />
//       <button type="submit">{editingTodo ? 'Edit Todo' : 'Add Todo'}</button>
//       {editingTodo && (
//         <button
//           type="button"
//           onClick={() => {
//             dispatch(setEditingTodoId(null));
//             reset();
//           }}
//         >
//           Cancel
//         </button>
//       )}
//     </form>
//   );
// };

// export default TodoForm;

import React from 'react'

export const TodoForm = () => {
  return (
    <div>TodoForm</div>
  )
}
