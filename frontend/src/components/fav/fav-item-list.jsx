import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useFavContext } from "../../contexts/fav-context";
import { onToggleFavorite } from "../../store/fav";
import { getImageURL } from "../../utils/app";
import AppLoading from "../loading";

export default function FavItems({ searchVal }) {
  const [favItems, setFavItems] = useState([]);
  const favState = useSelector((state) => state.favorite);
  const favCtx = useFavContext();

  useEffect(() => {
    const items = Object.values(favState.fav);
    setFavItems(items);
  }, [favState.fav]);

  const filteredItems = () => {
    if (searchVal === "") {
      return favItems;
    }

    return favItems.filter((item) =>
      item.name.toLowerCase().includes(searchVal)
    );
  };

  if (favItems.length === 0) {
    return <p className="alert alert-info">Empty Favorites</p>;
  }

  return filteredItems().map((fav) => (
    <div className="col-md-3" key={fav._id}>
      <FavItem
        item={fav}
        favItems={favState.fav}
        onToggleFav={onToggleFavorite}
      />
    </div>
  ));
}

function FavItem({ item, favItems, onToggleFav }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isFav = favItems[item._id];
  const history = useHistory();
  const imageURL =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/2560px-Etsy_logo.svg.png";

  const handleViewItem = () => {
    history.push("/item/1");
  };

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
    <Link className="view-link" to={`/item/${item._id}`}>
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
