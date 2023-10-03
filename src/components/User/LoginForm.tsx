// components/LoginForm.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../../features/auth/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';

interface LoginFormProps {}

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      dispatch(loginAsync(data))
        .then(unwrapResult)
        .then((user) => {
          // Handle the user if needed
          console.log('Logged in user:', user);
        })
        .catch((error: Error) => {
          // Explicitly specify the type of the 'error' parameter
          console.error('Login failed:', error.message);
        });
    } catch (error) {
      // Handle other errors
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} placeholder="Email" />
      <input {...register('password', { required: true })} type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
