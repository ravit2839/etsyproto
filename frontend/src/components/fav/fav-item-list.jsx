import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useFavContext } from "../../contexts/fav-context";
import { getImageURL } from "../../utils/app";
import AppLoading from "../loading";

export default function FavItems({ searchVal }) {
  const [favItems, setFavItems] = useState([]);
  const favCtx = useFavContext();

  useEffect(() => {
    const items = Object.values(favCtx.fav);
    setFavItems(items);
  }, [favCtx.fav]);

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
    <div className="col-md-3" key={fav.id}>
      <FavItem
        item={fav}
        favItems={favCtx.fav}
        onToggleFav={favCtx.onToggleFav}
      />
    </div>
  ));
}

function FavItem({ item, favItems, onToggleFav }) {
  const [isLoading, setIsLoading] = useState(false);
  const isFav = favItems[item.id];
  const history = useHistory();
  const imageURL =
    "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

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
        />
        <Card.Body>
          <Card.Title>Item Name: {item.name}</Card.Title>
          <Card.Text>Price: ${item.price}</Card.Text>
          <Card.Text>
            {isLoading && <AppLoading />}
            {!isLoading && (
              <i
                class={`${favIconClassname()} float-left pointer`}
                aria-hidden="true"
                onClick={handleToggleFavItem}
              />
            )}
            {/* <i class="fa fa-heart float-left pointer" aria-hidden="true" /> */}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
