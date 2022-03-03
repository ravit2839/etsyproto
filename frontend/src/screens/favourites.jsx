import { useHistory } from "react-router-dom";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import BaseLayout from "../layouts/base";
import { Link } from "react-router-dom";

export default function FavouritesScreen() {
  return (
    <BaseLayout hasSearch={false}>
      <UserProfile />
      <input
        type="text"
        className="form-control"
        placeholder="Search your favourites ..."
      />
      <div className="my-3 row g-3">
        <div className="col-md-3">
          <FavItems />
        </div>
        <div className="col-md-3">
          <FavItems />
        </div>
        <div className="col-md-3">
          <FavItems />
        </div>
        <div className="col-md-3">
          <FavItems />
        </div>
        <div className="col-md-3">
          <FavItems />
        </div>
      </div>
    </BaseLayout>
  );
}

function UserProfile() {
  const history = useHistory();

  const navigateToProfile = () => {
    history.push("/profile");
  };

  return (
    <div className="mb-4">
      <h3 className="d-inline">John Smith</h3>
      <i className="fa fa-pencil mx-3 pointer" onClick={navigateToProfile} />
      <hr />
    </div>
  );
}

function FavItems() {
  return <FavItem />;
}

function FavItem() {
  const imageURL =
    "https://i.imgur.com/qzJWbOU_d.webp?maxwidth=1520&fidelity=grand";
  const history = useHistory();

  const handleViewItem = () => {
    history.push("/item/1");
  };

  return (
    <Link className="view-link" to="/item/1">
      <Card>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title>Item Name</Card.Title>
          <Card.Text>Price: $32</Card.Text>
          <Card.Text>
            <i class="fa fa-heart float-left pointer" aria-hidden="true" />
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
