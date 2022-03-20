import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useCartContext } from "../contexts/cart-context";
import BaseLayout from "../layouts/base";
import * as checkoutApi from "../apis/checkout";
import useApi from "../hooks/use-api";
import { AppLoading, ServerError } from "../components";

export default function CartPage() {
  const cartCtx = useCartContext();
  const history = useHistory();
  const checkout = useApi(checkoutApi.checkout, { hasCatchError: true });

  const navigateToPurchases = async () => {
    try {
      const checkoutItems = Object.values(cartCtx.cart).map((item) => {
        return {
          itemId: item.id,
          quantity: item.quantity,
        };
      });
      await checkout.request({ items: checkoutItems });
      console.log("checkout items: ", checkoutItems);
      cartCtx.onResetCart();
      history.push("/purchases");
    } catch (_) {}
  };

  return (
    <BaseLayout hasSearch={false}>
      <h3 className="text-center">Your Cart</h3>
      <hr />
      <div className="mt-5">
        <div className="my-3">
          <ServerError error={checkout.error} />
        </div>
        <CartItems cartCtx={cartCtx} />
        <div className="float-end">
          {checkout.isLoading && <AppLoading />}
          {!checkout.isLoading && (
            <button
              className="btn btn-success mb-5"
              onClick={navigateToPurchases}
              disabled={Object.keys(cartCtx.cart).length === 0}
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}

function CartItems({ cartCtx }) {
  const cart = cartCtx.cart;

  const calculateTotalPrice = () => {
    let total = 0;
    Object.values(cart).forEach((item) => {
      const price = item.price * item.quantity;
      total += price;
    });
    return total;
  };

  return (
    <table className="table table-bordered table-hover">
      <caption className="text-center">
        Total Price: ${calculateTotalPrice()}
      </caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(cart).map((item) => (
          <tr key={item.id}>
            <td>
              <Link to={`/item/${item.id}`}>{item.name}</Link>
            </td>
            <td>{item.quantity}</td>
            <td>${item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
