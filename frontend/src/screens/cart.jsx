import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";
import { useCartContext } from "../contexts/cart-context";
import BaseLayout from "../layouts/base";
import * as checkoutApi from "../apis/checkout";
import useApi from "../hooks/use-api";
import { ServerError } from "../components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { onAddToCart, onRemoveFromCart, onResetCart } from "../store/cart";
import { useState } from "react";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const history = useHistory();
  const [isGift, setIsGift] = useState(true);
  const [description, setDescription] = useState("");
  const checkout = useApi(checkoutApi.checkout, { hasCatchError: true });
  const [gifts, setGifts] = useState({});

  const navigateToPurchases = async () => {
    console.log("gifts object: ", gifts);

    const checkoutItems = Object.values(cartState.cart).map((item) => {
      const cartItem = {};

      if (gifts[item._id]) {
        cartItem.isGift = gifts[item._id].isGift;
        cartItem.description = gifts[item._id].description;
      } else {
        cartItem.isGift = false;
        cartItem.description = "";
      }

      return { ...cartItem, itemId: item._id, quantity: item.cartQuantity };
    });

    console.log("checkout_items: ", checkoutItems);

    try {
      await checkout.request({ items: checkoutItems });
      console.log("checkout items: ", checkoutItems);
      dispatch(onResetCart());
      history.push("/purchases");
    } catch (_) {}
  };

  const handleIsGift = (id, val) => {
    if (gifts[id]) {
      const foundElem = { ...gifts[id] };
      foundElem.isGift = val;
      setGifts({ ...gifts, [id]: foundElem });
      return;
    }

    const newGiftItem = { isGift: val, description: "" };
    setGifts({ ...gifts, [id]: newGiftItem });
  };

  const handleDescription = (id, val) => {
    if (gifts[id]) {
      const foundElem = { ...gifts[id] };
      foundElem.description = val;
      setGifts({ ...gifts, [id]: foundElem });
      return;
    }

    const newGiftItem = { isGift: false, description: val };
    setGifts({ ...gifts, [id]: newGiftItem });
  };

  return (
    <BaseLayout hasSearch={false}>
      <h3 className="text-center">Your Cart</h3>
      <hr />
      <div className="mt-5">
        <div className="my-3">
          <ServerError error={checkout.error} />
        </div>
        <CartItems
          cart={cartState.cart}
          onIsGiftChange={handleIsGift}
          onDescriptionChange={handleDescription}
        />

        <div>
          {/* {checkout.isLoading && <AppLoading />} */}
          {!checkout.isLoading && (
            <button
              className="btn btn-success mb-5"
              onClick={navigateToPurchases}
              disabled={Object.keys(cartState.cart).length === 0}
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}

function CartItems({ cart, onIsGiftChange, onDescriptionChange }) {
  const dispatch = useDispatch();

  const calculateTotalPrice = () => {
    let total = 0;
    Object.values(cart).forEach((item) => {
      const price = item.price * item.cartQuantity;
      total += price;
    });
    return total;
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(onRemoveFromCart(itemId));
  };

  return (
    <table className="table table-bordered">
      <caption className="text-center">
        Total Price: ${calculateTotalPrice()}
      </caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Is Gift</th>
          <th>Description</th>
          <th>Cart</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(cart).map((item) => (
          <tr key={item._id}>
            <td>
              <Link to={`/item/${item._id}`}>{item.name}</Link>
            </td>
            <td>{item.quantity}</td>
            <td>${item.price}</td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={(e) => onIsGiftChange(item._id, e.target.checked)}
                  />
                  Is Gift ?
                </label>
              </div>
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                onChange={(e) => onDescriptionChange(item._id, e.target.value)}
              />
            </td>
            <td>
              <Cart item={item} />
            </td>
            <td>
              <i
                class="fa fa-times pointer"
                aria-hidden="true"
                onClick={() => handleRemoveFromCart(item._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Cart({ item }) {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [cartValue, setCartValue] = useState(cart[item._id]?.cartQuantity ?? 1);

  const handleIncrement = () => {
    dispatch(onAddToCart(item, 1));
    setCartValue((prev) => prev + 1);
  };

  const handleDecrement = () => {
    dispatch(onAddToCart(item, -1));
    setCartValue((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    dispatch(onAddToCart(item, cartValue));
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
            <i class="fa fa-plus" aria-hidden="true" />
          </button>
        </ListGroup.Item>
      )}
    </>
  );
}