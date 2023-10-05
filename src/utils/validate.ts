import * as yup from "yup";
import {rules} from "./rules";

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