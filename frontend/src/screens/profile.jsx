import BaseLayout from "../layouts/base";

export default function ProfileScreen() {
  return (
    <BaseLayout hasSearch={false}>
      <h3 className="text-center">Your Public Profile</h3>
      <hr />
      <form className="my-4">
        <div className="form-group">
          <label htmlFor="profile_image">Profile Picture</label>
          <input type="file" className="form-control" id="profile_image" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="dof">Date of Birth</label>
          <input type="date" className="form-control" id="dof" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="city">City</label>
          <input type="text" className="form-control" id="city" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="phone">Phone</label>
          <input type="text" className="form-control" id="phone" />
        </div>
        <div class="form-group">
          <label for="about">About</label>
          <textarea class="form-control" rows="2" id="about"></textarea>
        </div>
        <div class="form-group mt-3">
          <label for="address">Address*</label>
          <textarea class="form-control" rows="2" id="address"></textarea>
        </div>
        <div class="form-group mt-3">
          <label for="country">Select Country</label>
          <select class="form-control" id="country">
            <option value="ind">India</option>
            <option value="usa">USA</option>
            <option value="can">Canada</option>
          </select>
        </div>

        <button className="btn btn-success mt-3">Save Changes</button>
      </form>
    </BaseLayout>
  );
}
