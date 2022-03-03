import { Field } from "formik";
import { useHistory } from "react-router-dom";
import { AppForm, FieldError } from "../components/app-form";
import { loginSchema } from "../utils/validations";

export default function LoginScreen() {
  const history = useHistory();

  const handleRegister = () => {
    history.replace("/register");
  };

  const handleSubmit = ({ formValues }) => {
    console.log("form values: ", formValues);
    history.replace("/");
  };

  return (
    <div className="container-fluid bg-light text-dark mt-3 py-3">
      <div className="row justify-content-center align-items-center">
        <h2 className="text-center">Login</h2>
      </div>
      <hr />
      <div className="row justify-content-center align-items-center h-100">
        <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <AppForm
            initialValues={initialValues}
            validationSchema={loginSchema}
            handleSubmit={handleSubmit}
          >
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <Field
                type="text"
                className="form-control"
                id="email"
                name="email"
              />
              <FieldError field="email" />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
              <FieldError field="password" />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-sm">Login</button>
              <button
                className="btn btn-secondary btn-sm mx-3"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </AppForm>
        </div>
      </div>
    </div>
  );
}

const initialValues = {
  email: "",
  password: "",
};
