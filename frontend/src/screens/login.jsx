import { Field } from "formik";
import { useHistory } from "react-router-dom";
import { AppForm, FieldError } from "../components/app-form";
import useApi from "../hooks/use-api";
import { loginSchema } from "../utils/validations";
import * as authApi from "../apis/auth";
import { ServerError } from "../components";
import { BASE_URL } from "../utils/app";

export default function LoginScreen() {
  const auth = useApi(authApi.login, { hasCatchError: true });
  const history = useHistory();

  const handleRegister = () => {
    history.replace("/register");
  };

  const handleSubmit = async ({ formValues }) => {
    try {
      console.log("form values: ", formValues);
      const res = await auth.request(formValues);
      const { user } = res.data;
      const { token, ...userFields } = user;
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("user", JSON.stringify(userFields));
      history.push("/");
      window.location.reload();
    } catch (_) {}
  };

  return (
    <div className="container-fluid bg-light text-dark mt-3 py-3">
      <div className="row justify-content-center align-items-center">
<<<<<<< HEAD
        <h2 className="text-center" style={{marginBottom:"350px"}}>SignIn</h2>
=======
        <h2 className="text-center" style={{marginBottom:"350px"}}>Sigin</h2>
>>>>>>> origin/main
      </div>
      <hr />
      <div className="row justify-content-center align-items-center h-100">
        <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <ServerError error={auth.error} />
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
<<<<<<< HEAD
            <button className="btn btn-primary btn-sm" style={{backgroundColor:'orange', borderRadius:'15px'}}>Login</button>
              <button
                className="btn btn-secondary btn-sm mx-3"style={{backgroundColor:'black',borderRadius:'15px' }} onClick={handleRegister} 
              >              
=======
              <button className="btn btn-primary btn-sm" style={{backgroundColor:'orange', borderRadius:'15px'}}>Login</button>
              <button
                className="btn btn-secondary btn-sm mx-3"style={{backgroundColor:'black',borderRadius:'15px' }} onClick={handleRegister} 
              >
>>>>>>> origin/main
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
