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
<<<<<<< HEAD
      allCategories.request(props.shop._id);
    }
  }, [props.shop]);

  if (allCategories.isLoading) return <></>;

  if (!allCategories.data) return <></>;

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

=======
      allCategories.request(props.shop.id);
    }
  }, [props.shop]);

  if (allCategories.isLoading) return <AppLoading />;

  if (!allCategories.data) return <></>;

  const handleImg = (e) => {
    setFeaturedImg(e.target.files[0]);
  };

>>>>>>> origin/main
  const handleSubmit = async ({ formValues }) => {
    console.log("formvalues: ", formValues);

    const itemFields = {
      ...formValues,
      image: itemImgs,
      featured: featuredImg,
<<<<<<< HEAD
      shopId: props.shop._id,
=======
      shopId: props.shop.id,
>>>>>>> origin/main
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
<<<<<<< HEAD
          {/* <div className="my-3">
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
          </div> */}
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
=======
          <div className="my-3">
          </div>
          {allCategories.data.length === 0 && (
            <div className="alert alert-info mt-3">
              <p>Create a category first</p>
              <Link to="/item-category">Create Item Category</Link>
            </div>
          )}
>>>>>>> origin/main
          <div className="form-group">
            <label htmlFor="item_image">Item Image</label>
            <input
              type="file"
              className="form-control"
              id="item_image"
<<<<<<< HEAD
              onChange={handleFeaturedImg}
=======
              onChange={handleImg}
>>>>>>> origin/main
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
<<<<<<< HEAD
          {allCategories.data.length === 0 && (
            <div className="alert alert-info mt-3">
              <p>Please Create Item Category First</p>
              <Link to="/item-category">Create Item Category</Link>
            </div>
          )}
          {allCategories.data.length > 0 && (
            <div className="form-group mt-3">
              <label htmlFor="category">Select Category</label>
=======
          {/* {allCategories.data.length === 0 && (
            <div className="alert alert-info mt-3">
              <p>Create a category first</p>
              <Link to="/item-category">Create Item Category</Link>
            </div>
          )} */}
          {allCategories.data.length > 0 && (
            <div className="form-group mt-3">
              <label for="category">Select Category</label>
>>>>>>> origin/main
              <Field
                component="select"
                className="form-control"
                id="category"
                name="categoryId"
              >
                <option>------</option>
                {allCategories.data.map((categ) => (
<<<<<<< HEAD
                  <option key={categ._id} value={categ._id}>
=======
                  <option key={categ.id} value={categ.id}>
>>>>>>> origin/main
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
<<<<<<< HEAD
          {newItem.isLoading && <AppLoading />}
=======
>>>>>>> origin/main
          <button
            style={{backgroundColor:"burlywood", color:"black"}}
            type="submit"
            className="btn btn-success mt-3"
<<<<<<< HEAD
            disabled={allCategories.data.length === 0 || newItem.isLoading}
=======
            disabled={allCategories.data.length === 0}
>>>>>>> origin/main
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
