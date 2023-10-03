// features/todos.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodosState {
  list: Todo[];
  editingTodoId: number | null;
}

const initialState: TodosState = {
  list: [],
  editingTodoId: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: state.list.length + 1,
        text: action.payload,
        completed: false,
      };
      state.list.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.list.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todoToEdit = state.list.find((t) => t.id === action.payload.id);
      if (todoToEdit) {
        todoToEdit.text = action.payload.text;
      }
      state.editingTodoId = null;
    },
    setEditingTodoId: (state, action: PayloadAction<number | null>) => {
      state.editingTodoId = action.payload;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  setEditingTodoId,
} = todosSlice.actions;
export default todosSlice.reducer;
