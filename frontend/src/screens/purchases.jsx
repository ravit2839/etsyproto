import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import BaseLayout from "../layouts/base";
import * as purchaseApi from "../apis/purchase";
import useApi from "../hooks/use-api";
import { useEffect } from "react";
import { AppLoading } from "../components";
import { getImageURL } from "../utils/app";
import "./css/purchases.css"
export default function PurchasesScreen() {
  return (
    <BaseLayout hasSearch={false}>
      <h3 className="text-center">Your Purchases</h3>
      <hr />
      <div className="mt-4">
        <PurchaseItems />
      </div>
    </BaseLayout>
  );
}

function PurchaseItems() {
  const allPurchasesApi = useApi(purchaseApi.getAllPurchases, {
    keyExtractor: "purchases",
  });

  useEffect(() => {
    allPurchasesApi.request();
  }, []);

  if (allPurchasesApi.isLoading) return <AppLoading />;

  if (!allPurchasesApi.data) return <></>;

  if (allPurchasesApi.data.length === 0) {
    return <div className="alert alert-info">No Purchases</div>;
  }

  return (
    <div className="row g-3">
      {allPurchasesApi.data.map((purchaseItem, i) => (
        <div className="col-md-4">
          <PurchaseItem key={i} item={purchaseItem} />
        </div>
      ))}
    </div>
  );
}

function PurchaseItem({ item }) {
  

  return (
    <Card className="imgr">
      <Card.Img variant="top" src={getImageURL(item.itemImage)} />
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <p>
            <span className="fw-bold">Order ID:</span>
            <span className="mx-2">{item.orderId}</span>
          </p>
          <p>
            <span className="fw-bold">Item Name:</span>
            <span className="mx-2">{item.itemName}</span>
          </p>
        </ListGroupItem>
        <ListGroupItem>
          <p>
            <span className="fw-bold">Item Price:</span>
            <span className="mx-2">${item.itemPrice}</span>
          </p>
        </ListGroupItem>
        <ListGroupItem>
          <p>
            <span className="fw-bold">Shop Name:</span>
            <span className="mx-2">
              <Link to={`/shop/${item.Shop.id}`} style={{ color: 'black' }}>{item.Shop.name}</Link>
            </span>
          </p>
        </ListGroupItem>
        <ListGroupItem>
          <p>
            <span className="fw-bold">Quantity:</span>
            <span className="mx-2">{item.itemQuantity}</span>
          </p>
        </ListGroupItem>
        <ListGroupItem>
          <p>
            <span className="fw-bold">Date of Purchase:</span>
            <span className="mx-2">
              {moment(item.purchasedDate).format("MMMM Do YYYY")}
            </span>
          </p>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}