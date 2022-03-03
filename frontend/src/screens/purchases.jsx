import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import BaseLayout from "../layouts/base";

export default function PurchasesScreen() {
  return (
    <BaseLayout hasSearch={false}>
      <h3 className="text-center">Your Purchases</h3>
      <hr />
      <div className="mt-4">
        <PurchaseItems />
      </div>
    </BaseLayout>
  );
}

function PurchaseItems() {
  const items = [1, 2, 3, 4, 5];

  return (
    <div className="row g-3">
      {items.map((_, i) => (
        <div className="col-md-3">
          <PurchaseItem key={i} />
        </div>
      ))}
    </div>
  );
}

function PurchaseItem() {
  const imageURL =
    "https://media.istockphoto.com/photos/bakery-chef-prepare-pizza-picture-id1291299956?b=1&k=20&m=1291299956&s=170667a&w=0&h=Ys_FLtdY0Uzc7yTQl6JzvCHTQ3eRAuqNNU4x8EX1FB8=";

  return (
    <Card>
      <Card.Img variant="top" src={imageURL} />
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <p>
            <span className="fw-bold">Order ID:</span>
            <span className="mx-2">abc121zaajjhds221</span>
          </p>
          <p>
            <span className="fw-bold">Item Name:</span>
            <span className="mx-2">Pizza</span>
          </p>
        </ListGroupItem>
        <ListGroupItem>
          <p>
            <span className="fw-bold">Item Price:</span>
            <span className="mx-2">$30</span>
          </p>
        </ListGroupItem>
        <ListGroupItem>
          <p>
            <span className="fw-bold">Shop Name:</span>
            <span className="mx-2">
              <Link to="/shop">DollarSmart</Link>
            </span>
          </p>
        </ListGroupItem>
        <ListGroupItem>
          <p>
            <span className="fw-bold">Qauntity:</span>
            <span className="mx-2">10</span>
          </p>
        </ListGroupItem>
        <ListGroupItem>
          <p>
            <span className="fw-bold">Date of Purchased:</span>
            <span className="mx-2">20 Jan, 2021</span>
          </p>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}
