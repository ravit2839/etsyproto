import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavbar({ hasSearch = true }) {
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.replace("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#" as={Link} to="/">
          Etsy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/favs">
              <i class="fa fa-heart-o" aria-hidden="true" />
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <i class="fa fa-shopping-cart" aria-hidden="true" />
            </Nav.Link>
            <NavDropdown
              title={<i className="fa fa-user-circle" />}
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

              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {hasSearch && (
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
