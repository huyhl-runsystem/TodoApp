import React  from 'react';
import "../../style/RegisterForm.css"
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { validate } from "../../utils/validate";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../api/routes";
import { useEffect, useId } from "react";
import InputControl from "../../components/Common/InputControl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { IUserRegister } from "../../interfaces/IUserRegister";
import {
  registerAsync,
  setSuccessRegister,
} from "../../store/RegisterReducer";
import { useLoading } from "../../hook/Loading";
import FormControl from '../../components/Common/FormControl';


interface FormState {
  email: string;
  password: string;
  full_name: string;
}
const RegisterValidate = validate.pick(["email", "password", "full_name"]);
export default function Register() {
  const { showLoading, hideLoading, isLoading } = useLoading();
  const { isLoading: isLoadingState, isSuccess } = useSelector(
    (state: RootState) => state.register
  );
  const { t } = useTranslation();
  const $id = useId();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    resolver: yupResolver(RegisterValidate),
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IUserRegister> = async (data) => {
    await dispatch(registerAsync({ ...data, url_img: "1" }));
  };

  useEffect(() => {
    isLoadingState ? showLoading() : hideLoading();
    if (isSuccess) {
      navigate("/login");
      dispatch(setSuccessRegister());
    }
  }, [isLoadingState, showLoading, hideLoading, isSuccess, navigate, dispatch]);

  return (
    <div className="register-container">
      {!isLoading && (
        <Form
          id={$id}
          onFinish={handleSubmit(onSubmit)}
          className="register-form "
          noValidate
        >
          <div className="title-register">{t("Register")}</div>

          <FormControl errors={errors.full_name}  name="full_name">
          <InputControl
            placeholder="Fullname"
            name="full_name"
            control={control}
            errors={errors.full_name}
          />
          </FormControl>
          
          <FormControl errors={errors.email} name="email">
          <InputControl
            placeholder="Email"
            name="email"
            control={control}
            errors={errors.email}
          />
          </FormControl>

          <FormControl errors={errors.password} name="password">
          <InputControl
            placeholder="Password"
            name="password"
            control={control}
            errors={errors.password}
            type="password"
          />
          </FormControl>

          <Form.Item>
            <Button
              form={$id}
              htmlType="submit"
              type="primary"
              className="register-form-button"
            >
              {t("Register")}
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              form={$id}
              htmlType="submit"
              type="primary"
              className="back-to-login-page"
            >
              <Link to={path.loginPath} className="back-to-login-page">
              {t("Back to login page")}
              </Link>
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}