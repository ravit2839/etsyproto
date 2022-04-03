import { Link } from "react-router-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { getImageURL } from "../../utils/app";

export default function ShopViewItems({ items, searchVal }) {
  const getShopItems = () => {
    if (searchVal === "") return items;
    return items.filter((item) => item.name.toLowerCase().includes(searchVal));
  };

  return getShopItems().map((item, i) => (
    <div className="col-md-3">
      <ShopItem key={i} item={item} />
    </div>
  ));
}

function ShopItem({ item }) {
  return (
    <Link className="view-link" to={`/item/${item._id}`}>
      <Card>
        <Card.Img variant="top" src={item.featuredImage} />
        <Card.Body>
          <Card.Title>Item Name: {item.name}</Card.Title>
          <Card.Text>Price: ${item.price}</Card.Text>
          <Card.Text>Total Sales: {item.salesCount}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <p>{item.description}</p>
          </ListGroupItem>
          <ListGroupItem>
            <i className="">
              {item.quantity === 0 ? "Out of Stock" : "In Stock"}
            </i>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Link>
  );
}
