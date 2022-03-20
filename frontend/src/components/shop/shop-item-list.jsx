import { useHistory } from "react-router-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as shopApi from "../../apis/shop";
import useApi from "../../hooks/use-api";
import AppLoading from "../loading";
import { getImageURL } from "../../utils/app";
import {Button} from "react-bootstrap"

export default function ShopItems({ shop, newItem, searchVal }) {
  const shopItems = useApi(shopApi.getShopItems, { keyExtractor: "items" });
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
  const history = useHistory();
  const imageURL =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/2560px-Etsy_logo.svg.png"
  const navigateToItemUpdatePage = (e) => {
    e.stopPropagation();
    history.push("/item/edit/" + item.id);
  };

  const navigateToSingleItemPage = () => {
    history.push("/item/" + item.id);
  };
        return (
    <div className="pointer" onClick={navigateToSingleItemPage}>
      <Card>
        <Card.Img
          variant="top"
          src={item.featuredImage ? getImageURL(item.featuredImage) : imageURL}
        />
        <Card.Body>
          <Card.Title>Item Name: {item.name}</Card.Title>
          <Card.Text>Price: ${item.price}</Card.Text>
          <Card.Text>Category: {item.ItemCategory.name}</Card.Text>
          <Card.Text>Total Sales: {item.salesCount}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <p>{item.description}</p>
          </ListGroupItem>
          <ListGroupItem>
            <i className="">
              {item.quantity === 0 ? "Out of Stock" : "Available"}
            </i>
          </ListGroupItem>
        </ListGroup>
      </Card>
      <Button variant="primary" onClick={navigateToItemUpdatePage} style={{marginTop :"15px" , backgroundColor:"black", borderRadius:"20px"}}>
          Edit Product  
        </Button>
    </div>
  );
}
