<<<<<<< HEAD
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { range } from "underscore";
=======
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
>>>>>>> origin/main
import { Link } from "react-router-dom";
import moment from "moment";
import BaseLayout from "../layouts/base";
import * as purchaseApi from "../apis/purchase";
import useApi from "../hooks/use-api";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { AppLoading } from "../components";
import { getImageURL } from "../utils/app";
import "./css/purchases.css"

=======
import { useEffect } from "react";
import { AppLoading } from "../components";
import { getImageURL } from "../utils/app";
import "./css/purchases.css"
>>>>>>> origin/main
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
<<<<<<< HEAD
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [purchases, setPurchases] = useState([]);

=======
>>>>>>> origin/main
  const allPurchasesApi = useApi(purchaseApi.getAllPurchases, {
    keyExtractor: "purchases",
  });

  useEffect(() => {
<<<<<<< HEAD
    allPurchasesApi.request().then((res) => {
      setPurchases(res.data.purchases);
    });
  }, []);

  if (allPurchasesApi.isLoading) return <></>;
=======
    allPurchasesApi.request();
  }, []);

  if (allPurchasesApi.isLoading) return <AppLoading />;
>>>>>>> origin/main

  if (!allPurchasesApi.data) return <></>;

  if (allPurchasesApi.data.length === 0) {
<<<<<<< HEAD
    return <div className="alert alert-info">No Purchases </div>;
  }

  const getPaginatedItems = () => {
    const paginatedItems = purchases.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    return paginatedItems;
  };

  return (
    <div className="row g-3">
      <PaginationFilter
        current={itemsPerPage}
        onChangeFilter={(val) => setItemsPerPage(val)}
      />
      {getPaginatedItems().map((purchaseItem, i) => (
=======
    return <div className="alert alert-info">No Purchases</div>;
  }

  return (
    <div className="row g-3">
      {allPurchasesApi.data.map((purchaseItem, i) => (
>>>>>>> origin/main
        <div className="col-md-4">
          <PurchaseItem key={i} item={purchaseItem} />
        </div>
      ))}
<<<<<<< HEAD
      <div className="d-flex justify-content-center">
        <Pagination
          items={purchases}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          handlePagination={(val) => setCurrentPage(+val)}
        />
      </div>
    </div>
  );
}

function PaginationFilter({ onChangeFilter, current }) {
  const items = [2, 5, 10];

  return (
    <div className="form-group">
      <label style={{marginBottom:"-1px"}} htmlFor="filter">Select Items per Page:</label>
      <select
        className="form-control"
        id="filter"
        onChange={(e) => onChangeFilter(+e.target.value)}
      >
        {items.map((item) => (
          <option
            key={item}
            value={item}
            selected={+item == +current ? "selected" : ""}
          >
            {item}
          </option>
        ))}
      </select>
=======
>>>>>>> origin/main
    </div>
  );
}

<<<<<<< HEAD
function Pagination({ items, currentPage, itemsPerPage, handlePagination }) {
  const itemLength = Math.ceil(items.length / itemsPerPage);
  const paginationList = range(1, itemLength + 1);
  console.log(itemLength);

  function getActiveClassName(item) {
    let className = "page-item ";
    className += item === currentPage ? "active" : "";
    return className;
  }

  return (
    itemLength > 1 && (
      <ul className="pagination">
        {paginationList.map((item) => (
          <li
            className={getActiveClassName(item)}
            key={item}
            style={{ cursor: "pointer" }}
            onClick={() => handlePagination(item)}
          >
            <span style={{backgroundColor:"burlywood" ,color:"black"}} className="page-link">{item}</span>
          </li>
        ))}
      </ul>
    )
  );
}

function PurchaseItem({ item }) {


  return (
    <Card style={{marginTop:"10px"}}>
      <Card.Img variant="top" src={item.itemImage} />
=======
function PurchaseItem({ item }) {
  

  return (
    <Card className="imgr">
      <Card.Img variant="top" src={getImageURL(item.itemImage)} />
>>>>>>> origin/main
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
<<<<<<< HEAD
              <Link to={`/shop/${item.shopId._id}`} style={{color: 'black'}}>{item.shopId.name}</Link>
=======
              <Link to={`/shop/${item.Shop.id}`} style={{ color: 'black' }}>{item.Shop.name}</Link>
>>>>>>> origin/main
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
<<<<<<< HEAD
        {item.isGift && (
          <>
            <ListGroupItem>
              <p>
                <span className="fw-bold">Is Gift:</span>
                <span className="mx-2">Yes</span>
              </p>
            </ListGroupItem>
              {item.description && (
               <ListGroupItem>
                 <p>
                   <span className="fw-bold">Description:</span>
                   <span className="mx-2">{item.description}</span>
                 </p>
               </ListGroupItem>
             )}
          </>
        )}
      </ListGroup>
    </Card>
  );
}
=======
      </ListGroup>
    </Card>
  );
}
>>>>>>> origin/main
