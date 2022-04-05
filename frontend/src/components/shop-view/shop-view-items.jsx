import { Link } from "react-router-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { getImageURL } from "../../utils/app";

export default function ShopViewItems({ items, searchVal }) {
  const getShopItems = () => {
    if (searchVal === "") return items;
    return items.filter((item) => item.name.toLowerCase().includes(searchVal));
  };

  return getShopItems().map((item, i) => (
<<<<<<< HEAD
    <div className="col-md-3">
=======
    <div className="col-md-3" >
>>>>>>> origin/main
      <ShopItem key={i} item={item} />
    </div>
  ));
}

function ShopItem({ item }) {
  return (
<<<<<<< HEAD
    <Link className="view-link" to={`/item/${item._id}`}>
      <Card>
        <Card.Img variant="top" src={item.featuredImage} />
        <Card.Body>
          <Card.Title>Item Name: {item.name}</Card.Title>
          <Card.Text>Price: ${item.price}</Card.Text>
=======
    <Link className="view-link" to={`/item/${item.id}`}>
      <Card>
        <Card.Img variant="top" src={getImageURL(item.featuredImage)} />
        <Card.Body>
          <Card.Title>Item Name: {item.name}</Card.Title>
          <Card.Text>Price: ${item.price} <i className="fa fa-pencil mx-3 pointer"  /></Card.Text>
>>>>>>> origin/main
          <Card.Text>Total Sales: {item.salesCount}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <p>{item.description}</p>
          </ListGroupItem>
          <ListGroupItem>
<<<<<<< HEAD
            <i className="">
              {item.quantity === 0 ? "Out of Stock" : "In Stock"}
            </i>
          </ListGroupItem>
        </ListGroup>
=======
            <strong><i className="" >
              {item.quantity === 0 ? "Out of Stock" : "In Stock"}
            </i></strong>
          </ListGroupItem>
        </ListGroup>
        {/* <i className="fa fa-pencil mx-3 pointer"  /> */}
>>>>>>> origin/main
      </Card>
    </Link>
  );
}
