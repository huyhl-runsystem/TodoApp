import * as yup from "yup";

export const rules = {
    lengthPassword: "Độ dài từ 8 - 16 ký tự",
    requiredPassword: "Password là bắt buộc",
    requiredEmail: "Email là bắt buộc",
    formatEmail: "Email không đúng định dạng",
    requiredFullname: "Fullname là bắt buộc",
    requiredImage: "Ảnh là bắt buộc",
  };

export const validate = yup.object({
  email: yup.string().required(rules.requiredPassword).email(rules.formatEmail),
  password: yup
    .string()
    .required(rules.requiredEmail)
    .min(6, rules.lengthPassword)
    .max(160, rules.lengthPassword),
  full_name: yup.string().required("Fullname là bắt buộc"),
  url_img: yup.string().required("Img là bắt buộc"),
});