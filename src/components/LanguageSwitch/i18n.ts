import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        User: "User",
        ListUser: "List Users",
        Info: "My Information",
        Todo: "Todo",
        ListTodo: "List Todo",
        CreateTodo: "Create Todo",
        Language: "Language",
        TileLogin: "Login",
        Password: "Password",
        QuestionCreateAcount: "Don't Have an Account?",
        CreateAcount: "Create New Acount",
      },
    },
    vi: {
      translation: {
        User: "Tài khoản",
        ListUser: "Tất cả tài khoản",
        Info: "Thông tin cá nhân",
        Todo: "Việc làm",
        ListTodo: "Tất cả việc làm",
        CreateTodo: "Tạo việc làm",
        Language: "Ngôn ngữ",
        TileLogin: "Đăng nhập",
        Password: "Mật khẩu",
        QuestionCreateAcount: "Bạn không có tài khoản?",
        CreateAcount: "Tạo tài khoản mới",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;