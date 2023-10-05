import React  from 'react';
import "../../style/LoginForm.css";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { validate } from "../../utils/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../store/LoginReducer";
import { AppDispatch } from "../../store/store";
import { Button, Form, Input } from "antd";
import { path } from "../../api/routes";
import { useTranslation } from "react-i18next";
import FormControl from "../../components/Common/FormControl";
import { IUserLogin } from "../../interfaces/IUserLogin";

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
      dispatch(loginAsync(data));
    }
  };

  return (
    <div className="container">
      <Form id="login" onFinish={handleSubmit(onSubmit)} className="login-form">
        <div className="title-login">{t("Sign In")}</div>
        <FormControl
          errors={errors.email}
          name="email"
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input placeholder="Email" {...field} />}
          />
        </FormControl>
        <FormControl
          errors={errors.password}
          name="password"
        > 
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input placeholder="Password" {...field} />}
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
          {t("QuestionCreateAcount")}
          {/* <Link to={path.registerPath} className="create-account-link">
            {t("CreateAcount")}
          </Link> */}
        </div>
      </Form>
    </div>
  );
}