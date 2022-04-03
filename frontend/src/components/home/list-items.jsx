import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import * as itemApi from "../../apis/item";
import useApi from "../../hooks/use-api";
import { useFavContext } from "../../contexts/fav-context";
import { useDispatch, useSelector } from "react-redux";
import { onToggleFavorite } from "../../store/fav";

export default function ListItems() {
  const favState = useSelector((state) => state.favorite);
  const favCtx = useFavContext();
  const item = useApi(itemApi.getAllItems, { keyExtractor: "items" });

  console.log("---------------------------------------------------");
  console.log(item)

  useEffect(() => {
    item.request();
  }, []);

  if (item.isLoading || favState.isLoading) return <></>;

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
          favItems={favState.fav}
          onToggleFav={onToggleFavorite}
        />
      </div>
    ));
  }
}

function Item({ item, favItems, onToggleFav, toggleLoading }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isFav = favItems[item._id];
  const imageURL =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/2560px-Etsy_logo.svg.png";

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
        />
        <Card.Body>
          <Card.Title>Item Name: {item.name}</Card.Title>
          <Card.Text>Price: ${item.price}</Card.Text>
          <Card.Text>
            {/* {isLoading && <AppLoading />} */}
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
