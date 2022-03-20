import { Field } from "formik";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { itemSchema } from "../../utils/validations";
import { AppForm, FieldError } from "../app-form";
import * as itemApi from "../../apis/item";
import * as itemCategoryApi from "../../apis/item-category";
import useApi from "../../hooks/use-api";
import ServerError from "../server-error";
import AppLoading from "../loading";
import { Link } from "react-router-dom";

export default function ItemModal(props) {
  const newItem = useApi(itemApi.createNewItem, { hasCatchError: true });
  const [itemImgs, setItemImgs] = useState([]);
  const [featuredImg, setFeaturedImg] = useState("");
  const allCategories = useApi(itemCategoryApi.getAllCategories, {
    keyExtractor: "categories",
  });

  useEffect(() => {
    if (props.shop) {
      console.log("shop: ", props.shop);
      allCategories.request(props.shop.id);
    }
  }, [props.shop]);

  if (allCategories.isLoading) return <AppLoading />;

  if (!allCategories.data) return <></>;

  const handleImg = (e) => {
    setFeaturedImg(e.target.files[0]);
  };

  const handleSubmit = async ({ formValues }) => {
    console.log("formvalues: ", formValues);

    const itemFields = {
      ...formValues,
      image: itemImgs,
      featured: featuredImg,
      shopId: props.shop.id,
    };

    try {
      const res = await newItem.request(itemFields);
      const newCreatedItem = res.data.item;
      props.onItemAdded(newCreatedItem);
      props.onHide();
    } catch (_) {}
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="item-modal">Create Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ServerError error={newItem.error} />
        <AppForm
          initialValues={initValues}
          validationSchema={itemSchema}
          handleSubmit={handleSubmit}
        >
          <div className="my-3">
          </div>
          {allCategories.data.length === 0 && (
            <div className="alert alert-info mt-3">
              <p>Create a category first</p>
              <Link to="/item-category">Create Item Category</Link>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="item_image">Item Image</label>
            <input
              type="file"
              className="form-control"
              id="item_image"
              onChange={handleImg}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="item_name">Item Name</label>
            <Field
              type="text"
              className="form-control"
              id="item_name"
              name="name"
            />
            <FieldError field="name" />
          </div>
          {/* {allCategories.data.length === 0 && (
            <div className="alert alert-info mt-3">
              <p>Create a category first</p>
              <Link to="/item-category">Create Item Category</Link>
            </div>
          )} */}
          {allCategories.data.length > 0 && (
            <div className="form-group mt-3">
              <label for="category">Select Category</label>
              <Field
                component="select"
                className="form-control"
                id="category"
                name="categoryId"
              >
                <option>------</option>
                {allCategories.data.map((categ) => (
                  <option key={categ.id} value={categ.id}>
                    {categ.name}
                  </option>
                ))}
              </Field>
              <FieldError field="categoryId" />
            </div>
          )}
          <div className="form-group mt-3">
            <label htmlFor="description">Description</label>
            <Field
              type="text"
              className="form-control"
              id="description"
              name="description"
            />
            <FieldError field="description" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="price">Price</label>
            <Field
              type="number"
              className="form-control"
              id="price"
              name="price"
            />
            <FieldError field="price" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="stock_qty">Stock Quantity</label>
            <Field
              type="number"
              className="form-control"
              id="stock_qty"
              name="quantity"
            />
            <FieldError field="quantity" />
          </div>
          <button
            style={{backgroundColor:"burlywood", color:"black"}}
            type="submit"
            className="btn btn-success mt-3"
            disabled={allCategories.data.length === 0}
          >
            Save Changes
          </button>
        </AppForm>
      </Modal.Body>
    </Modal>
  );
}

const initValues = {
  name: "",
  categoryId: "",
  description: "",
  price: "",
  quantity: "",
};
