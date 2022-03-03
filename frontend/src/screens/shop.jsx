import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import BaseLayout from "../layouts/base";
import { Link } from "react-router-dom";
import UpdateShop from "../components/shop/update-shop";
import ItemModal from "../components/shop/item-modal";
import ShopItems from "../components/shop/shop-item-list";

export default function ShopScreen() {
  const [shop, setShop] = useState();
  const [showItemModal, setShowItemModal] = useState(false);
  const [newItem, setNewItem] = useState();

  const handleShopUpdate = (shop) => {
    setShop(shop);
  };

  const handleItemAdded = (item) => {};

  return (
    <BaseLayout hasSearch={false}>
      <h3 className="text-center">Shop</h3>
      <hr />
      <UpdateShop onShopReceived={handleShopUpdate} />
      <hr />

      <div className="mt-5">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search items .."
            />
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              onClick={() => setShowItemModal(true)}
            >
              Add New Item
            </button>
            <ItemModal
              show={showItemModal}
              onHide={() => setShowItemModal(false)}
              onItemAdded={handleItemAdded}
              shop={shop}
            />
          </div>
        </div>
        <div className="row g-3 mt-2">
          <ShopItems shop={shop} newItem={newItem} />
        </div>
      </div>
    </BaseLayout>
  );
}
