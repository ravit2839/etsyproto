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
<<<<<<< HEAD
  address: yup.string().required(),
=======
  address: yup.string().nullable().required(),
>>>>>>> origin/main
  country: yup.string().nullable().notRequired(),
  dateOfBirth: yup.string().nullable().notRequired(),
});

export const itemSchema = yup.object().shape({
  name: yup.string().required(),
<<<<<<< HEAD
  categoryId: yup.string().required(),
=======
  categoryId: yup.number().required(),
>>>>>>> origin/main
  description: yup.string().required(),
  price: yup.number().required(),
  quantity: yup.number().required(),
});
