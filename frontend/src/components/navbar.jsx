import { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
<<<<<<< HEAD
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
=======
  Modal,
} from "react-bootstrap";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import { Link } from "react-router-dom";
import { useSearchContext } from "../contexts/search-context";
>>>>>>> origin/main
import "./css/Header.css"
import "./css/navbar.css"


<<<<<<< HEAD
export default function AppNavbar({ hasSearch = true }) {
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search);
=======

export default function AppNavbar({ hasSearch = true }) {
  const searchCtx = useSearchContext();
>>>>>>> origin/main
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
<<<<<<< HEAD
                value={searchState.data.searchVal}
                onChange={(e) => dispatch(handleSearchVal(e.target.value))}
=======
                value={searchCtx.data.searchVal}
                onChange={(e) => searchCtx.handleSearchVal(e.target.value)}
>>>>>>> origin/main
              />
              <i
                className="fa fa-filter pointer d-flex align-items-center mx-3"
                aria-hidden="true"
                onClick={() => setShowFilter(true)}
              />
            </Form>
          )}

<<<<<<< HEAD
         <FilterModal show={showFilter}
          onHide={() => setShowFilter(false)} />

        
=======
          <FilterModal
            show={showFilter}
            onHide={() => setShowFilter(false)}
            searchCtx={searchCtx}
          />
>>>>>>> origin/main
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/favs">
<<<<<<< HEAD
            <FavoriteBorderOutlinedIcon style={{ color: 'black' }}/>              
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
            <ShoppingBasketIcon style={{ color: 'black' }}/>
=======
              {/* <i class="fa fa-heart-o" aria-hidden="true" /> */}
              <div className='headerOptionfav'>
              <FavoriteBorderOutlinedIcon style={{ color: 'black' }}/>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              {/* <i class="fa fa-shopping-cart" aria-hidden="true" /> */}
              <ShoppingBasketIcon style={{ color: 'black' }}/>
>>>>>>> origin/main
            </Nav.Link>
            <NavDropdown
              title={ <FaceOutlinedIcon style={{ color: 'black'}}/>}
              id="navbarScrollingDropdown"
<<<<<<< HEAD
            >
              <NavDropdown.Item as={Link} to="/profile">
=======
              className="loggr"
            >
              <NavDropdown.Item as={Link} to="/profile"  >
>>>>>>> origin/main
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
<<<<<<< HEAD

=======
>>>>>>> origin/main
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function FilterModal(props) {
<<<<<<< HEAD
  const searchState = useSelector((state) => state.search);
  const dispatch = useDispatch();
=======
  const searchCtx = props.searchCtx;
>>>>>>> origin/main

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
<<<<<<< HEAD
                  value={searchState.data.sort.sortKey}
                  onChange={(e) => dispatch(handleSortKey(e.target.value))}
=======
                  value={searchCtx.data.sort.sortKey}
                  onChange={(e) => searchCtx.handleSortKey(e.target.value)}
>>>>>>> origin/main
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
<<<<<<< HEAD
                  value={searchState.data.sort.sortOrder}
                  onChange={(e) => dispatch(handleSortOrder(e.target.value))}
=======
                  value={searchCtx.data.sort.sortOrder}
                  onChange={(e) => searchCtx.handleSortOrder(e.target.value)}
>>>>>>> origin/main
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
<<<<<<< HEAD
                    searchState.data.priceRange.min === 0
                      ? ""
                      : searchState.data.priceRange.min
                  }
                  onChange={(e) => dispatch(handleMinPrice(e.target.value))}
=======
                    searchCtx.data.priceRange.min === 0
                      ? ""
                      : searchCtx.data.priceRange.min
                  }
                  onChange={(e) => searchCtx.handleMinPrice(e.target.value)}
>>>>>>> origin/main
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
<<<<<<< HEAD
                    searchState.data.priceRange.max === 0
                      ? ""
                      : searchState.data.priceRange.max
                  }
                  onChange={(e) => dispatch(handleMaxPrice(e.target.value))}
=======
                    searchCtx.data.priceRange.max === 0
                      ? ""
                      : searchCtx.data.priceRange.max
                  }
                  onChange={(e) => searchCtx.handleMaxPrice(e.target.value)}
>>>>>>> origin/main
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
<<<<<<< HEAD
                checked={searchState.data.isOutOfStock}
                onChange={(e) => dispatch(handleIsOutOfStock(e.target.checked))}
=======
                checked={searchCtx.data.isOutOfStock}
                onChange={(e) => searchCtx.handleIsOutOfStock(e.target.checked)}
>>>>>>> origin/main
              />
              {"  "}
              Exclude out of Stock Items
            </label>
          </div>
        </div>
        <hr />
        <button
          className="btn btn-danger"
<<<<<<< HEAD
          onClick={() => dispatch(handleReset())}
=======
          onClick={() => searchCtx.handleReset()}
>>>>>>> origin/main
        >
          Reset
        </button>
      </Modal.Body>
    </Modal>
  );
}
