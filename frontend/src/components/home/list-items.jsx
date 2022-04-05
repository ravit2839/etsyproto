import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import * as itemApi from "../../apis/item";
import useApi from "../../hooks/use-api";
<<<<<<< HEAD
import { useFavContext } from "../../contexts/fav-context";
import { useDispatch, useSelector } from "react-redux";
import { onToggleFavorite } from "../../store/fav";

export default function ListItems() {
  const favState = useSelector((state) => state.favorite);
  const favCtx = useFavContext();
  const item = useApi(itemApi.getAllItems, { keyExtractor: "items" });

  console.log("---------------------------------------------------");
  console.log(item)

=======
import AppLoading from "../loading";
import { getImageURL } from "../../utils/app";
import { useFavContext } from "../../contexts/fav-context";

export default function ListItems() {
  const favCtx = useFavContext();
  const item = useApi(itemApi.getAllItems, { keyExtractor: "items" });

>>>>>>> origin/main
  useEffect(() => {
    item.request();
  }, []);

<<<<<<< HEAD
  if (item.isLoading || favState.isLoading) return <></>;
=======
  if (item.isLoading || favCtx.isLoading) return <AppLoading />;
>>>>>>> origin/main

  if (!item.data) return <></>;

  if (item.data.length === 0) {
    return <p className="alert alert-info">No Items yet</p>;
  }

  if (item.data) {
    return item.data.map((_item, i) => (
      <div className="col-md-3">
        <Item
          key={i}
          item={_item}
<<<<<<< HEAD
          favItems={favState.fav}
          onToggleFav={onToggleFavorite}
=======
          favItems={favCtx.fav}
          onToggleFav={favCtx.onToggleFav}
          toggleLoading={favCtx.toggleLoading}
>>>>>>> origin/main
        />
      </div>
    ));
  }
}

function Item({ item, favItems, onToggleFav, toggleLoading }) {
<<<<<<< HEAD
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isFav = favItems[item._id];
  const imageURL =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/2560px-Etsy_logo.svg.png";
=======
  const [isLoading, setIsLoading] = useState(false);
  const isFav = favItems[item.id];
  const imageURL =
    "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";
>>>>>>> origin/main

  const favIconClassname = () => {
    let icon = "fa fa-heart";
    if (!isFav) {
      icon += "-o";
    }
    return icon;
  };

  const handleToggleFavItem = (e) => {
    e.preventDefault();
    setIsLoading(true);
<<<<<<< HEAD
    dispatch(
      onToggleFav(item, isFav, () => {
        setIsLoading(false);
      })
    );
  };

  return (
    <Link className="view-link" to={`item/${item._id}`}>
      <Card>
        <Card.Img
          variant="top"
          src={item.featuredImage ? item.featuredImage : imageURL}
=======
    onToggleFav(item, isFav, () => {
      setIsLoading(false);
    });
  };

  return (
    <Link className="view-link" to={`item/${item.id}`}>
      <Card>
        <Card.Img
          variant="top"
          src={item.featuredImage ? getImageURL(item.featuredImage) : imageURL}
>>>>>>> origin/main
        />
        <Card.Body>
          <Card.Title>Item Name: {item.name}</Card.Title>
          <Card.Text>Price: ${item.price}</Card.Text>
          <Card.Text>
<<<<<<< HEAD
            {/* {isLoading && <AppLoading />} */}
=======
            {isLoading && <AppLoading />}
>>>>>>> origin/main
            {!isLoading && (
              <i
                className={`${favIconClassname()} float-left pointer`}
                aria-hidden="true"
                onClick={handleToggleFavItem}
              />
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
