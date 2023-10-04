import "../../style/LoginForm.css";
import React  from 'react';
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { validate } from "../../utils/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../store/reducer";
import { AppDispatch } from "../../store/store";
import { Button, Form, Input } from "antd";
import { path } from "../../api/routes";
import { useTranslation } from "react-i18next";
import FormControl from "../../components/FormControl/FormControl";
import { IUserLogin } from "../../interfaces/IUserLogin";

const loginValidate = validate.pick(["email", "password"]);
export default function Login() {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
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
      <h1> Hello</h1>
      <Form id="login" onFinish={handleSubmit(onSubmit)} className="login-form">
        <div className="title-login">{t("TileLogin")}</div>
        <FormControl
          errors={errors.email}
          // control={control}
          // prefix={<UserOutlined className="site-form-item-icon" />}
          name="email"
          // placeholder={"Email"}
        >
          <h1>2</h1>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input placeholder="Email" {...field} />}
          />
        </FormControl>
        <FormControl
          errors={errors.password}
          // control={control}
          // prefix={<LockOutlined className="site-form-item-icon" />}
          name="password"
          // placeholder={"Password"}
        > 
          <h2>3</h2>
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
            {t("TileLogin")}
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