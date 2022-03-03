import { Field } from "formik";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { itemSchema } from "../../utils/validations";
import { AppForm, FieldError } from "../app-form";
import * as itemApi from "../../apis/item";
import useApi from "../../hooks/use-api";

export default function ItemModal(props) {
  const newItem = useApi(itemApi.createNewItem, { hasCatchError: true });
  const [itemImgs, setItemImgs] = useState([]);
  const [featuredImg, setFeaturedImg] = useState("");

  const localImageURL = () => {
    return URL.createObjectURL(featuredImg);
  };

  const localImageURLs = () => {
    if (itemImgs.length > 0) {
      return itemImgs.map((img) => URL.createObjectURL(img));
    }

    return [];
  };

  const handleFeaturedImg = (e) => {
    setFeaturedImg(e.target.files[0]);
  };

  const handleInputFileChange = (e) => {
    const files = [...e.target.files];
    if (files.length > 3) {
      alert("Please use only 3 files");
      return;
    } else {
      setItemImgs(files);
    }
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
      await newItem.request(itemFields);
      props.onItemAdded(formValues);
      props.onHide();
    } catch (_) {}
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="item-modal">Create Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AppForm
          initialValues={initValues}
          validationSchema={itemSchema}
          handleSubmit={handleSubmit}
        >
          <div className="my-3">
            {localImageURLs().map((imgURL) => (
              <img
                key={imgURL}
                src={imgURL}
                alt="Item Image"
                width="200"
                className="mx-2"
              />
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="item_image">Item Image</label>
            <input
              type="file"
              className="form-control"
              id="item_image"
              multiple
              onChange={handleInputFileChange}
              max="3"
            />
          </div>
          <div className="my-3">
            {featuredImg && (
              <img
                src={localImageURL()}
                alt="Item Image"
                width="200"
                className="mx-2"
              />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="item_image">Featured Item Image</label>
            <input
              type="file"
              className="form-control"
              id="item_image"
              onChange={handleFeaturedImg}
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
          <div class="form-group mt-3">
            <label for="category">Select Category</label>
            <Field
              component="select"
              class="form-control"
              id="category"
              name="categoryId"
            >
              <option value="1">Clothing</option>
              <option value="2">Entertainment</option>
              <option value="3">Art</option>
            </Field>
            <FieldError field="categoryId" />
          </div>
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
          <button type="submit" className="btn btn-success mt-3">
            Save Changes
          </button>
        </AppForm>
      </Modal.Body>
    </Modal>
  );
}

const initValues = {
  name: "item",
  categoryId: "1",
  description: "description",
  price: "100",
  quantity: "3",
};
