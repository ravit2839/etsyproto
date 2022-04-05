import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
<<<<<<< HEAD
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useFavContext } from "../../contexts/fav-context";
import { onToggleFavorite } from "../../store/fav";
=======
import { Link, useHistory } from "react-router-dom";
import { useFavContext } from "../../contexts/fav-context";
>>>>>>> origin/main
import { getImageURL } from "../../utils/app";
import AppLoading from "../loading";

export default function FavItems({ searchVal }) {
  const [favItems, setFavItems] = useState([]);
<<<<<<< HEAD
  const favState = useSelector((state) => state.favorite);
  const favCtx = useFavContext();

  useEffect(() => {
    const items = Object.values(favState.fav);
    setFavItems(items);
  }, [favState.fav]);
=======
  const favCtx = useFavContext();

  useEffect(() => {
    const items = Object.values(favCtx.fav);
    setFavItems(items);
  }, [favCtx.fav]);
>>>>>>> origin/main

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
<<<<<<< HEAD
    <div className="col-md-3" key={fav._id}>
      <FavItem
        item={fav}
        favItems={favState.fav}
        onToggleFav={onToggleFavorite}
=======
    <div className="col-md-3" key={fav.id}>
      <FavItem
        item={fav}
        favItems={favCtx.fav}
        onToggleFav={favCtx.onToggleFav}
>>>>>>> origin/main
      />
    </div>
  ));
}

function FavItem({ item, favItems, onToggleFav }) {
<<<<<<< HEAD
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isFav = favItems[item._id];
  const history = useHistory();
  const imageURL =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/2560px-Etsy_logo.svg.png";
=======
  const [isLoading, setIsLoading] = useState(false);
  const isFav = favItems[item.id];
  const history = useHistory();
  const imageURL =
    "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";
>>>>>>> origin/main

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
<<<<<<< HEAD
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
=======
    onToggleFav(item, isFav, () => {
      setIsLoading(false);
    });
  };

  return (
    <Link className="view-link" to="/item/1">
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
<<<<<<< HEAD
=======
            {/* <i class="fa fa-heart float-left pointer" aria-hidden="true" /> */}
>>>>>>> origin/main
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
