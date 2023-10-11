import React, { useEffect }  from 'react';
import "../../style/LoginForm.css";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../../utils/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../store/LoginReducer";
import { AppDispatch, RootState } from "../../store/store";
import { Button, Form, Input } from "antd";
import { path } from "../../api/routes";
import { useTranslation } from "react-i18next";
import FormControl from "../../components/Common/FormControl";
import { IUserLogin } from "../../interfaces/IUserLogin";
import InputController from "../../components/Common/InputControl";
import { useLoading } from '../../hook/Loading';
import { useSelector } from 'react-redux';


const loginValidate = validate.pick(["email", "password"]);
export default function Login() {
  const { t } = useTranslation();
  const { control, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidate),
  });

  const dispatch = useDispatch<AppDispatch>();
  const onSubmit: SubmitHandler<IUserLogin> = async (data: IUserLogin) => {
    if (data) {
      alert("Logined in successfully")
      dispatch(loginAsync(data));
    }
  };
  const { showLoading, hideLoading, isLoading } = useLoading();
  const { isLoading: isLoadingState } = useSelector(
    (state: RootState) => state.login
  );

  useEffect(() => {
    isLoadingState ? showLoading() : hideLoading();
  }, [isLoadingState, showLoading, hideLoading]);

  return (
    <div className="container">
      <Form id="login" 
      onFinish={handleSubmit(onSubmit)} 
      className="login-form">
        <div className="title-login">{t("Sign In")}</div>
        
        <FormControl errors={errors.email} name="email">
          <InputController
              name="email"
              control={control}
              placeholder="Email"
              type="text"
          />
        </FormControl>

        <FormControl errors={errors.password} name="password"> 
          <InputController
              name="password"
              control={control}
              placeholder="Password"
              type="password"
          />
        </FormControl>
        <Form.Item>
          <Button
            id="login"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {t("Login")}
          </Button>
        </Form.Item>

        <div className="create-account">
          {t("Do not have an account?")}
          <Link to={path.registerPath} className="create-account-link">
          {t(" Create new account")}
          </Link>
        </div>
      </Form>
    </div>
  );
}

