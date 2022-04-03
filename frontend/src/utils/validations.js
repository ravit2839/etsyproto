import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export const registerSchema = yup.object().shape({
  name: yup.string().min(5).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export const profileSchema = yup.object().shape({
  name: yup.string().nullable().notRequired(),
  city: yup.string().nullable().notRequired(),
  phone: yup.string().nullable().notRequired(),
  about: yup.string().nullable().notRequired(),
  address: yup.string().required(),
  country: yup.string().nullable().notRequired(),
  dateOfBirth: yup.string().nullable().notRequired(),
});

export const itemSchema = yup.object().shape({
  name: yup.string().required(),
  categoryId: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  quantity: yup.number().required(),
});
