import { useEffect } from "react";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import ListItems from "../components/home/list-items";
import { useSearchContext } from "../contexts/search-context";
import BaseLayout from "../layouts/base";
import * as itemsApi from "../apis/item";
import useApi from "../hooks/use-api";
import { getImageURL } from "../utils/app";
import { useSelector } from "react-redux";
import "./css/Home.css"

export default function HomeScreen() {
  const searchState = useSelector((state) => state.search);

  if (searchState.data.searchVal) {
    return (
      <BaseLayout>
        <SearchResults />
      </BaseLayout>
    );
  }

  return (
    <BaseLayout hasFooter>
   <img className='homeImage'
    src="https://htmlcolorcodes.com/assets/images/colors/pastel-orange-color-solid-background-1920x1080.png" 
    alt="something">
    </img>      
      <div className="row g-3 mb-5">
        <ListItems />
      </div>
      <div className="mb-5"></div>
    </BaseLayout>
  );
}

function SearchResults() {
  const searchState = useSelector((state) => state.search);
  const filterItems = useApi(itemsApi.filterItems, { keyExtractor: "items" });

  useEffect(() => {
    const searchVal = searchState.data.searchVal;
    console.log("searchState: ", searchState);
    if (searchVal) {
      console.log("search value: ", searchVal);
      filterItems.request(searchState.data);
    }
  }, [searchState.data.searchVal]);

  if (!searchState.data.searchVal) return <></>;

  if (filterItems.isLoading) return <></>;

  if (!filterItems.data) return <></>;

  const item = (filterItem) => {
    return (
      <Link className="text-decoration-none" to={`/item/${filterItem._id}`}>
        <Card>
          <Card.Img variant="top" src={filterItem.featuredImage} />
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <p>
                <span className="fw-bold">Item Name:</span>
                <span className="mx-2">{filterItem.name}</span>
              </p>
              <p>
                <span className="fw-bold">Item Price:</span>
                <span className="mx-2">${filterItem.price}</span>
              </p>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-center">
        Search Results: {searchState.data.searchVal}
      </h3>
      <div className="row">
        {filterItems.data.map((filterItem, i) => (
          <div className="col-md-3" key={i}>
            {item(filterItem)}
          </div>
        ))}
        <hr className="mt-3 mb-4" />
      </div>
    </div>
  );
}

function Items() {
  const items = [1, 2, 3, 4, 5];

  return items.map((_, i) => (
    <div className="col-md-3">
      <Item key={i} />
    </div>
  ));
}
