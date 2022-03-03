import { useState } from "react";
import { Button, ListGroup, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import BaseLayout from "../layouts/base";

const imageURL =
  "https://i.imgur.com/qzJWbOU_d.webp?maxwidth=1520&fidelity=grand";

export default function ItemScreen() {
  return (
    <BaseLayout>
      <div className="row">
        <div className="col-md-6">
          <ItemImagesCarousel />
        </div>
        <div className="col-md-6">
          <ListGroup>
            <ListGroup.Item>
              <h4>Item Name: Pizza</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Shop Name:</span>
                <Link to="/shop" className="mx-2">
                  DollarSmart
                </Link>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Sales Count</span>: $200
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Price</span>: $20
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Description</span>: Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Eaque vitae laborum
                consequatur culpa ipsum, suscipit voluptatibus quos ullam
                inventore nobis cumque, deleniti magnam quae. Sed eius
                repudiandae vel adipisci magni!
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Available Stock Quantity</span>: 35
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Add to Favourite</span>:{" "}
                <i class="fa fa-heart-o mx-2 pointer" aria-hidden="true" />
              </p>
            </ListGroup.Item>
            <CartOption />
            <ListGroup.Item>
              <div className="d-grid">
                <Button variant="light" size="lg">
                  Add to Cart
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </BaseLayout>
  );
}

function ItemImagesCarousel() {
  const image1 =
    "https://media.istockphoto.com/photos/bakery-chef-prepare-pizza-picture-id1291299956?b=1&k=20&m=1291299956&s=170667a&w=0&h=Ys_FLtdY0Uzc7yTQl6JzvCHTQ3eRAuqNNU4x8EX1FB8=";
  const image2 =
    "https://media.istockphoto.com/photos/homemade-indian-chicken-tikka-masala-pizza-picture-id1340589333?b=1&k=20&m=1340589333&s=170667a&w=0&h=rQaaNq-2klpZXcZ26amIfELKxq78-9S79FycY7Kzu28=";

  return (
    <Carousel>
      <Carousel.Item>
        <img src={image1} alt="Single Item Image" className="d-block w-100" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={image2} alt="Single Item Image" className="d-block w-100" />
      </Carousel.Item>
    </Carousel>
  );
}

function CartOption() {
  const [cartValue, setCartValue] = useState(1);

  const handleIncrement = () => {
    setCartValue((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCartValue((prev) => prev - 1);
  };

  return (
    <ListGroup.Item>
      <button
        className="btn btn-light btn-sm"
        onClick={handleDecrement}
        disabled={cartValue === 1}
      >
        <i class="fa fa-minus" aria-hidden="true" />
      </button>
      <span className="mx-5">{cartValue}</span>
      <button className="btn btn-light btn-sm" onClick={handleIncrement}>
        <i class="fa fa-plus" aria-hidden="true" />
      </button>
    </ListGroup.Item>
  );
}
