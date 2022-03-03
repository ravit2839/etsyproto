import { Link } from "react-router-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as shopApi from "../../apis/shop";
import useApi from "../../hooks/use-api";
import AppLoading from "../loading";
import { getImageURL } from "../../utils/app";

export default function ShopItems({ shop, newItem }) {
  const shopItems = useApi(shopApi.getShopItems, { keyExtractor: "items" });
  //   const [shopItems, setShopItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (shop) {
      shopItems.request(shop.id).then((res) => {
        const items = res.data.items;
        setItems(items);
      });
    }
  }, [shop]);

  useEffect(() => {
    if (newItem) {
      const newItems = [...items, newItem];
      setItems(newItems);
    }
  }, [newItem]);

  if (!shop) return <></>;

  if (shopItems.isLoading) return <AppLoading />;

  if (!shopItems.data) return <></>;

  const getShopItems = () => {
    return items;
  };

  return getShopItems().map((item, i) => (
    <div className="col-md-3">
      <ShopItem key={i} item={item} />
    </div>
  ));
}

function ShopItem({ item }) {
  const imageURL =
    "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

  return (
    <Link className="view-link" to={`/item/${item.id}`}>
      <Card>
        <Card.Img
          variant="top"
          src={item.image ? getImageURL(item.image) : imageURL}
        />
        <Card.Body>
          <Card.Title>Item Name: {item.name}</Card.Title>
          <Card.Text>Price: ${item.price}</Card.Text>
          <Card.Text>Category</Card.Text>
          <Card.Text>Total Sales: {item.salesCount}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <p>{item.description}</p>
          </ListGroupItem>
          <ListGroupItem>
            <i className="">
              {item.quantity === 0 ? "Not Available" : "Available"}
            </i>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Link>
  );
}
