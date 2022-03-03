import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import BaseLayout from "../layouts/base";
import { Link } from "react-router-dom";

export default function ShopScreen() {
  const [showItemModal, setShowItemModal] = useState(false);

  return (
    <BaseLayout hasSearch={false}>
      <h3 className="text-center">Shop</h3>
      <hr />
      <form className="mt-4">
        <div className="form-group">
          <label htmlFor="shop_image">Shop Picture</label>
          <input type="file" className="form-control" id="shop_image" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="shop_name">Shop Name</label>
          <input type="text" className="form-control" id="shop_name" />
        </div>
        <button className="btn btn-success mt-3">Save Changes</button>
      </form>
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
            />
          </div>
        </div>
        <div className="row g-3 mt-2">
          <ShopItems />
        </div>
      </div>
    </BaseLayout>
  );
}

function ItemModal(props) {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="item-modal">Create or Update Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="item_image">Item Image</label>
            <input type="file" className="form-control" id="item_image" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="item_name">Item Name</label>
            <input type="text" className="form-control" id="item_name" />
          </div>
          <div class="form-group mt-3">
            <label for="category">Select Category</label>
            <select class="form-control" id="category">
              <option value="ind">Clothing</option>
              <option value="usa">Entertainment</option>
              <option value="can">ArtI</option>
            </select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="price">Price</label>
            <input type="number" className="form-control" id="price" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="stock_qty">Stock Quantity</label>
            <input type="number" className="form-control" id="stock_qty" />
          </div>
          <button className="btn btn-success mt-3">Save Changes</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function ShopItems() {
  const items = [1, 2, 3, 4, 5];

  return items.map((_, i) => (
    <div className="col-md-3">
      <ShopItem key={i} />
    </div>
  ));
}

function ShopItem() {
  const imageURL =
    "https://i.imgur.com/qzJWbOU_d.webp?maxwidth=1520&fidelity=grand";
  const history = useHistory();

  const handleViewItem = () => {
    history.push("/item/1");
  };

  return (
    <Link className="view-link" to="/item/1">
      <Card>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title>Item Name</Card.Title>
          <Card.Text>Price: $32</Card.Text>
          <Card.Text>Category</Card.Text>
          <Card.Text>Total Sales: $20</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <p>Description</p>
          </ListGroupItem>
          <ListGroupItem>
            <i class="fa fa-heart float-left pointer" aria-hidden="true" />
            <i className="mx-3">Available</i>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Link>
  );
}
