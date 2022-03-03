import { useHistory } from "react-router-dom";

export default function UserProfile() {
  const history = useHistory();
  const user = JSON.parse(window.localStorage.getItem("user"));

  const navigateToProfile = () => {
    history.push("/profile");
  };

  return (
    <div className="mb-4">
      <h3 className="d-inline">{user.name}</h3>
      <i className="fa fa-pencil mx-3 pointer" onClick={navigateToProfile} />
      <hr />
    </div>
  );
}
