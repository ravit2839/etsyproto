import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import BaseLayout from "../layouts/base";

export default function HomeScreen() {
  return (
    <BaseLayout>
      <SearchResults />
      <div className="row g-3">
        <Items />
      </div>
    </BaseLayout>
  );
}

function SearchResults() {
  const itemsCount = [1, 2, 3, 4];
  const imageURL =
    "https://i.imgur.com/qzJWbOU_d.webp?maxwidth=1520&fidelity=grand";
  const history = useHistory();

  const handleViewItem = () => {
    history.push("/item/1");
  };

  const item = () => {
    return (
      <Link className="text-decoration-none" to="/item/1">
        <Card>
          <Card.Img variant="top" src={imageURL} />
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <p>
                <span className="fw-bold">Item Name:</span>
                <span className="mx-2">Pizza</span>
              </p>
              <p>
                <span className="fw-bold">Item Price:</span>
                <span className="mx-2">$30</span>
              </p>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-center">Search Results: abc</h3>
      <div className="row">
        {itemsCount.map((_, i) => (
          <div className="col-md-3" key={i}>
            {item()}
          </div>
        ))}
        <hr className="mt-3 mb-4" />
      </div>
    </div>
  );
}

function Items() {
  const items = [1, 2, 3, 4, 5];

  return items.map((_, i) => (
    <div className="col-md-3">
      <Item key={i} />
    </div>
  ));
}

function Item() {
  const imageURL =
    "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

  const history = useHistory();

  const handleViewItem = () => {
    history.push("/item/1");
  };

  return (
    <Link className="view-link" to="item/1">
      <Card>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title>Item Name: Pizza</Card.Title>
          <Card.Text>Price: $32</Card.Text>
          <Card.Text>
            <i class="fa fa-heart float-left pointer" aria-hidden="true" />
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
