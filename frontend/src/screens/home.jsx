import { useEffect } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import {  Link } from "react-router-dom";
import ListItems from "../components/home/list-items";
import { useSearchContext } from "../contexts/search-context";
import BaseLayout from "../layouts/base";
import * as itemsApi from "../apis/item";
import useApi from "../hooks/use-api";
import { AppLoading } from "../components";
import { getImageURL } from "../utils/app";
import "./css/Home.css"

export default function HomeScreen() {
  const searchCtx = useSearchContext();

  if (searchCtx.data.searchVal) {
    return (
      <BaseLayout>
        <SearchResults />
      </BaseLayout>
    );
  }

  return (
    <BaseLayout hasFooter >
     {/* <BaseLayout hasFooter/> */}
   <img className='homeImage'
    src="https://htmlcolorcodes.com/assets/images/colors/pastel-orange-color-solid-background-1920x1080.png" 
    alt="something">
    </img>
      <div className="row g-3">
        <ListItems />
      </div>
    </BaseLayout>
  );
}

function SearchResults() {
  const searchCtx = useSearchContext();
  const filterItems = useApi(itemsApi.filterItems, { keyExtractor: "items" });
  useEffect(() => {
    const searchVal = searchCtx.data.searchVal;
    if (searchVal) {
      console.log("search value: ", searchVal);
      filterItems.request(searchCtx.data);
    }
  }, [searchCtx.data.searchVal]);

  if (!searchCtx.data.searchVal) return <></>;

  if (filterItems.isLoading) return <AppLoading />;

  if (!filterItems.data) return <></>;

  const item = (filterItem) => {
    return (
      <Link className="text-decoration-none" to={`/item/${filterItem.id}`}>
        <Card>
          <Card.Img
            variant="top"
            src={getImageURL(filterItem.featured_image)}
          />
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
        Search Results: {searchCtx.data.searchVal}
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

// function Items() {
//   const items = [1, 2, 3, 4, 5];

//   return items.map((_, i) => (
//     <div className="col-md-3">
//       <Item key={i} />
//     </div>
//   ));
// }

// function Item() {
//   const imageURL =
//     "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

//   const history = useHistory();

//   const handleViewItem = () => {
//     history.push("/item/1");
//   };

//   return (
//     <Link className="view-link" to="item/1">
//       <Card>
//         <Card.Img variant="top" src={imageURL} />
//         <Card.Body>
//           <Card.Title>Item Name: Pizza</Card.Title>
//           <Card.Text>Price: $32</Card.Text>
//           <Card.Text>
//             <i class="fa fa-heart float-left pointer" aria-hidden="true" />
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     </Link>
//   );
// }
