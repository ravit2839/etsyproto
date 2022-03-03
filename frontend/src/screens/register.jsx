import { Field } from "formik";
import { useHistory } from "react-router-dom";
import { AppForm, FieldError } from "../components/app-form";
import { registerSchema } from "../utils/validations";

export default function RegisterScreen() {
  const history = useHistory();

  const handleLogin = () => {
    history.replace("/login");
  };

  const handleSubmit = ({ formValues }) => {
    console.log("register form: ", formValues);
    history.replace("/login");
  };

  return (
    <div className="container-fluid bg-light text-dark mt-3 py-3">
      <div className="row justify-content-center align-items-center">
        <h2 className="text-center">Register</h2>
      </div>
      <hr />
      <div className="row justify-content-center align-items-center h-100">
        <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <AppForm
            initialValues={initialValues}
            validationSchema={registerSchema}
            handleSubmit={handleSubmit}
          >
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                className="form-control"
                name="name"
                id="name"
              />
              <FieldError field="name" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                className="form-control"
                name="email"
                id="email"
              />
              <FieldError field="email" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                className="form-control"
                name="password"
                id="password"
              />
              <FieldError field="password" />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-sm">Register</button>
              <button
                className="btn btn-secondary btn-sm mx-3"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </AppForm>
        </div>
      </div>
    </div>
  );
}

const initialValues = {
  name: "",
  email: "",
  password: "",
};
