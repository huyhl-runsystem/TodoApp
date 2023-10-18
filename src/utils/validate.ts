import * as yup from "yup";
import { rules } from "./rules";

export const validate = yup.object({
  email: yup.string().required(rules.requiredEmail).email(rules.formatEmail),
  password: yup
    .string()
    .required(rules.requiredPassword)
    .min(6, rules.minlengthPassword)
    .max(20, rules.maxlengthPassword),
  full_name: yup.string().required("Fullname required"),
  url_img: yup.string().required("Image required"),
});
