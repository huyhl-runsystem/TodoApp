import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { SignIn, UserLogin } from '../../store/authSlice';
import { ThunkDispatch } from 'redux-thunk';

const Login = () => {
  const { control, handleSubmit } = useForm<UserLogin>(
    {
      defaultValues: {
        email: '',
        password: ''
      }
    }    
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const onSubmit: SubmitHandler<UserLogin> = (data) => {
    if (data) {
      dispatch(SignIn(data));
    }
  };
  // const onSubmit = (data: any) => {
  //   console.log(data);
  //   dispatch(loginAsync(data));
  // };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Email">
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Enter your email" />
                {fieldState?.error && <p style={{ color: 'red' }}>{fieldState.error.message}</p>}
              </>
            )}
          />
        </Form.Item>

        <Form.Item label="Password">
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required', minLength: 6 }}
            render={({ field, fieldState }) => (
              <>
                <Input.Password {...field} placeholder="Enter your password" />
                {fieldState?.error && <p style={{ color: 'red' }}>{fieldState.error.message}</p>}
              </>
            )}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;