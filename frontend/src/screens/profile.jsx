import { Field } from "formik";
import { useEffect, useState } from "react";
import { AppForm, FieldError } from "../components/app-form";
import BaseLayout from "../layouts/base";
import { profileSchema } from "../utils/validations";
import * as userApi from "../apis/user";
import useApi from "../hooks/use-api";
import { AppLoading, ServerError } from "../components";
import { getImageURL } from "../utils/app";

export default function ProfileScreen() {
  const api = useApi(userApi.updateProfile, { hasCatchError: true });
  const user = JSON.parse(window.localStorage.getItem("user"));
  const [profileImg, setProfileImg] = useState("");
  const [isLocalImg, setIsLocalImg] = useState(false);

  const handleChangeProfileImage = (e) => {
    setIsLocalImg(true);
    setProfileImg(e.target.files[0]);
  };

  const localImageURL = () => {
    if (profileImg) {
      return URL.createObjectURL(profileImg);
    }

    return "";
  };

  const handleSubmit = async ({ formValues }) => {
    try {
      console.log("profile subbmited values: ", formValues);
      const res = await api.request({ ...formValues, profile: profileImg });
      const image = res.data.user.image;
      window.localStorage.setItem(
        "user",
        JSON.stringify({ ...formValues, image })
      );
    } catch (_) {}
  };

  return (
    <BaseLayout hasSearch={false}>
      <h3 className="text-center">Your Public Profile</h3>
      <hr />
      <div className="my-4">
        <ServerError error={api.error} />
        <AppForm
          initialValues={user}
          validationSchema={profileSchema}
          handleSubmit={handleSubmit}
        >
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="profile_image">Profile Picture</label>
                <input
                  type="file"
                  className="form-control"
                  id="profile_image"
                  // value={profileImg}
                  onChange={handleChangeProfileImage}
                />
              </div>
            </div>
            <div className="col-md-6">
              <img
                src={isLocalImg ? localImageURL() : getImageURL(user.image)}
                alt="Profile Image"
                width="200"
              />
            </div>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="name">Name</label>
            <Field type="text" className="form-control" id="name" name="name" />
            <FieldError field="name" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="dof">Date of Birth</label>
            <Field
              type="date"
              className="form-control"
              id="dof"
              name="dateOfBirth"
            />
            <FieldError field="dateOfBirth" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              className="form-control"
              id="email"
              name="email"
              disabled
            />
            <FieldError field="email" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="city">City</label>
            <Field type="text" className="form-control" id="city" name="city" />
            <FieldError field="city" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="phone">Phone</label>
            <Field
              type="text"
              className="form-control"
              id="phone"
              name="phone"
            />
            <FieldError field="phone" />
          </div>
          <div class="form-group mt-3">
            <label for="about">About</label>
            <Field
              component="textarea"
              className="form-control"
              rows="2"
              id="about"
              name="about"
            />
            <FieldError field="about" />

            {/* <textarea
              class="form-control"
              rows="2"
              id="about"
              name="about"
            ></textarea> */}
          </div>
          <div class="form-group mt-3">
            <label for="address">Address*</label>
            <Field
              component="textarea"
              className="form-control"
              rows="2"
              id="address"
              name="address"
            />
            <FieldError field="address" />
          </div>
          <div class="form-group mt-3">
            <label for="country">Select Country</label>
            <Field
              class="form-control"
              id="country"
              name="country"
              component="select"
            >
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="canada">Canada</option>
            </Field>
            <FieldError field="country" />
          </div>

          {api.isLoading && <AppLoading />}
          {!api.isLoading && (
            <button type="submit" className="btn btn-success mt-3">
              Save Changes
            </button>
          )}
        </AppForm>
      </div>
    </BaseLayout>
  );
}
