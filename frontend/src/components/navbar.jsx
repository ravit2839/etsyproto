import { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSearchContext } from "../contexts/search-context";
import {
  handleIsOutOfStock,
  handleMaxPrice,
  handleMinPrice,
  handleReset,
  handleSearchVal,
  handleSortKey,
  handleSortOrder,
} from "../store/search";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import "./css/Header.css"
import "./css/navbar.css"


export default function AppNavbar({ hasSearch = true }) {
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search);
  const [showFilter, setShowFilter] = useState(false);

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.replace("/login");
  };

  return (
    <Navbar className="headr" bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="header" href="#" as={Link} to="/">
        <img className="header_logo" 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/2560px-Etsy_logo.svg.png"
        alt=""
        >
        </img>
        </Navbar.Brand>
        {hasSearch && (
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchState.data.searchVal}
                onChange={(e) => dispatch(handleSearchVal(e.target.value))}
              />
              <i
                className="fa fa-filter pointer d-flex align-items-center mx-3"
                aria-hidden="true"
                onClick={() => setShowFilter(true)}
              />
            </Form>
          )}

         <FilterModal show={showFilter}
          onHide={() => setShowFilter(false)} />

        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/favs">
            <FavoriteBorderOutlinedIcon style={{ color: 'black' }}/>              
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
            <ShoppingBasketIcon style={{ color: 'black' }}/>
            </Nav.Link>
            <NavDropdown
              title={ <FaceOutlinedIcon style={{ color: 'black'}}/>}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/init-shop">
                Shop
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/purchases">
                Purchases
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/item-category">
                Item Category
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function FilterModal(props) {
  const searchState = useSelector((state) => state.search);
  const dispatch = useDispatch();

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="item-modal">Search Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h4>Sort</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="sort_key">Sort Key</label>
                <select
                  name=""
                  id="sort_key"
                  className="form-control"
                  value={searchState.data.sort.sortKey}
                  onChange={(e) => dispatch(handleSortKey(e.target.value))}
                >
                  <option>-------</option>
                  <option value="price">Price</option>
                  <option value="quantity">Quantity</option>
                  <option value="salesCount">Sales Count</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="sort_order">Sort Order</label>
                <select
                  name=""
                  id="sort_order"
                  className="form-control"
                  value={searchState.data.sort.sortOrder}
                  onChange={(e) => dispatch(handleSortOrder(e.target.value))}
                >
                  <option>-------</option>
                  <option value="asc">ASC</option>
                  <option value="desc">DESC</option>
                </select>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div>
          <h4>Price Range</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="min_price">Min Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={
                    searchState.data.priceRange.min === 0
                      ? ""
                      : searchState.data.priceRange.min
                  }
                  onChange={(e) => dispatch(handleMinPrice(e.target.value))}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="max_price">Max Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={
                    searchState.data.priceRange.max === 0
                      ? ""
                      : searchState.data.priceRange.max
                  }
                  onChange={(e) => dispatch(handleMaxPrice(e.target.value))}
                />
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div>
          <h4>Exclude Out of Stock Items</h4>
          <div className="form-check-inline">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                checked={searchState.data.isOutOfStock}
                onChange={(e) => dispatch(handleIsOutOfStock(e.target.checked))}
              />
              {"  "}
              Exclude out of Stock Items
            </label>
          </div>
        </div>
        <hr />
        <button
          className="btn btn-danger"
          onClick={() => dispatch(handleReset())}
        >
          Reset
        </button>
      </Modal.Body>
    </Modal>
  );
}
