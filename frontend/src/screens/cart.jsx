import { useHistory } from "react-router-dom";
import BaseLayout from "../layouts/base";

export default function CartPage() {
  const history = useHistory();

  const navigateToPurchases = () => {
    history.push("/purchases");
  };

  return (
    <BaseLayout>
      <h3 className="text-center">Your Cart</h3>
      <hr />
      <div className="mt-5">
        <CartItems />
        <div className="float-end">
          <button className="btn btn-success" onClick={navigateToPurchases}>
            Checkout
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}

function CartItems() {
  return (
    <table className="table table-bordered table-hover">
      <caption className="text-center">Total Price: $500</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Pizza</td>
          <td>4</td>
          <td>$300</td>
          <td>
            <i class="fa fa-times pointer" aria-hidden="true" />
          </td>
        </tr>
        <tr>
          <td>Pizza</td>
          <td>4</td>
          <td>$300</td>
          <td>
            <i class="fa fa-times pointer" aria-hidden="true" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
