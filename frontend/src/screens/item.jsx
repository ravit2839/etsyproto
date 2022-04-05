import { useEffect, useState } from "react";
import { Button, ListGroup, Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import BaseLayout from "../layouts/base";
import * as itemApi from "../apis/item";
import useApi from "../hooks/use-api";
import { AppLoading } from "../components";
import { useFavContext } from "../contexts/fav-context";
import { useCartContext } from "../contexts/cart-context";
import { getImageURL } from "../utils/app";
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import { onToggleFavorite } from "../store/fav";
import { onAddToCart } from "../store/cart";
import "./css/item.css"
=======
import "./css/item.css"
// const imageURL =
//   "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";
>>>>>>> origin/main

export default function ItemScreen() {
  const { id } = useParams();
  const {
    request,
    isLoading,
    data: item,
  } = useApi(itemApi.getItem, { keyExtractor: "item" });

  useEffect(() => {
    request(id);
  }, []);

<<<<<<< HEAD
  if (isLoading) return <></>;
=======
  if (isLoading) return <AppLoading />;
>>>>>>> origin/main

  if (!item) return <></>;

  console.log("item: ", item);

  return (
<<<<<<< HEAD
    <BaseLayout hasSearch={false}>
=======
    <BaseLayout>
>>>>>>> origin/main
      <div className="row">
        <div className="col-md-6">
          <ItemImagesCarousel featuredImage={item.featuredImage} />
        </div>
        <div className="col-md-6">
          <ListGroup>
            <ListGroup.Item>
              <h4>Item Name: {item.name}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Shop Name:</span>
<<<<<<< HEAD
                <Link to={`/shop/${item.shopId._id}`} className="mx-2">
                  {item.shopId.name}
=======
                <Link to={`/shop/${item.Shop.id}`} className="mx-2">
                  {item.Shop.name}
>>>>>>> origin/main
                </Link>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Sales Count</span>: {item.salesCount}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Price</span>: ${item.price}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Description</span>: {item.description}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Available Stock Quantity</span>:{" "}
                {item.quantity}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Fav item={item} />
            </ListGroup.Item>
            <Cart item={item} />
          </ListGroup>
        </div>
      </div>
    </BaseLayout>
  );
}

function Fav({ item }) {
  const favCtx = useFavContext();
<<<<<<< HEAD
  const dispatch = useDispatch();
  const favState = useSelector((state) => state.favorite);
  const [isLoading, setIsLoading] = useState(false);
  const isFav = favState.fav[item._id];
=======
  const [isLoading, setIsLoading] = useState(false);
  const isFav = favCtx.fav[item.id];
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
      onToggleFavorite(item, isFav, () => {
        setIsLoading(false);
      })
    );
=======
    favCtx.onToggleFav(item, isFav, () => {
      setIsLoading(false);
    });
>>>>>>> origin/main
  };

  return (
    <p>
      <span className="fw-bold">Add to Favourite</span>:{" "}
<<<<<<< HEAD
      {/* {isLoading && <AppLoading />} */}
=======
      {isLoading && <AppLoading />}
>>>>>>> origin/main
      {!isLoading && (
        <i
          className={`${favIconClassname()} mx-2 pointer`}
          aria-hidden="true"
          onClick={handleToggleFavItem}
        />
      )}
    </p>
  );
}

function ItemImagesCarousel({ featuredImage }) {
<<<<<<< HEAD
=======

>>>>>>> origin/main
  if (featuredImage === 0) {
    return <p className="alert alert-info">No Image for this item</p>;
  }

  return (
    <Carousel>
      <Carousel.Item>
<<<<<<< HEAD
        <img
          src={featuredImage} alt="Single Item Image" className="d-block w-100"
        />
=======
        <img src={getImageURL(featuredImage)} alt="something" className="d-block w-100"/>
>>>>>>> origin/main
      </Carousel.Item>
    </Carousel>
  );
}

function Cart({ item }) {
<<<<<<< HEAD
  const dispatch = useDispatch();
=======
  const cartCtx = useCartContext();
>>>>>>> origin/main
  const [cartValue, setCartValue] = useState(1);

  const handleIncrement = () => {
    setCartValue((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCartValue((prev) => prev - 1);
  };

  const handleAddToCart = () => {
<<<<<<< HEAD
    dispatch(onAddToCart(item, cartValue));
=======
    cartCtx.onAddToCart(item, cartValue);
>>>>>>> origin/main
  };

  return (
    <>
      {item.quantity > 0 && (
        <ListGroup.Item>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleDecrement}
            disabled={cartValue === 1}
          >
<<<<<<< HEAD
            <i className="fa fa-minus" aria-hidden="true" />
=======
            <i class="fa fa-minus" aria-hidden="true" />
>>>>>>> origin/main
          </button>
          <span className="mx-5">{cartValue}</span>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleIncrement}
            disabled={cartValue >= item.quantity}
          >
            <i className="fa fa-plus" aria-hidden="true" />
          </button>
        </ListGroup.Item>
      )}
      {item.quantity > 0 && (
        <ListGroup.Item>
          <div className="d-grid">
            <Button className="addtocart" variant="light" size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </ListGroup.Item>
      )}
      {item.quantity === 0 && (
        <ListGroup.Item>
          <strong><i>Item Out of Stock</i></strong>
        </ListGroup.Item>
      )}
    </>
  );
}
