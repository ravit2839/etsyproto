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
import "./css/item.css"
// const imageURL =
//   "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

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

  if (isLoading) return <AppLoading />;

  if (!item) return <></>;

  console.log("item: ", item);

  return (
    <BaseLayout>
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
                <Link to={`/shop/${item.Shop.id}`} className="mx-2">
                  {item.Shop.name}
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
  const [isLoading, setIsLoading] = useState(false);
  const isFav = favCtx.fav[item.id];

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
    favCtx.onToggleFav(item, isFav, () => {
      setIsLoading(false);
    });
  };

  return (
    <p>
      <span className="fw-bold">Add to Favourite</span>:{" "}
      {isLoading && <AppLoading />}
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

  if (featuredImage === 0) {
    return <p className="alert alert-info">No Image for this item</p>;
  }

  return (
    <Carousel>
      <Carousel.Item>
        <img src={getImageURL(featuredImage)} alt="something" className="d-block w-100"/>
      </Carousel.Item>
    </Carousel>
  );
}

function Cart({ item }) {
  const cartCtx = useCartContext();
  const [cartValue, setCartValue] = useState(1);

  const handleIncrement = () => {
    setCartValue((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCartValue((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    cartCtx.onAddToCart(item, cartValue);
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
            <i class="fa fa-minus" aria-hidden="true" />
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
