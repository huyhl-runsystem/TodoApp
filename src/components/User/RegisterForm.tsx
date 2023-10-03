// components/RegisterForm.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../../features/auth/authSlice';

interface RegisterFormProps {}

interface RegisterFormData {
  email: string;
  fullName: string;
  urlImage: string;
  password: string;
}

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    dispatch(registerAsync(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} placeholder="Email" />
      <input {...register('fullName', { required: true })} placeholder="Full Name" />
      <input {...register('urlImage', { required: true })} placeholder="Image URL" />
      <input {...register('password', { required: true })} type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
