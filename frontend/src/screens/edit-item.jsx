import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import useApi from "../hooks/use-api";
import BaseLayout from "../layouts/base";
import * as itemApi from "../apis/item";
import * as itemCategoryApi from "../apis/item-category";
import ServerError from "../components/server-error";
import { AppLoading } from "../components";

export default function EditItemScreen() {
  const { id } = useParams();
  const history = useHistory();

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState();
  const [name, setName] = useState("");
  const singleItem = useApi(itemApi.getItem, { keyExtractor: "item" });
  const updateItem = useApi(itemApi.updateItem, { hasCatchError: true });
  const allCategories = useApi(itemCategoryApi.getAllCategories, {
    keyExtractor: "categories",
  });

  useEffect(() => {
    singleItem.request(id).then((res) => {
      const item = res.data.item;
      console.log("item: ", item);
      console.log("item price: ", item.price);
      setPrice(item.price);
      setName(item.name);
      setCategory(item.categoryId);

      allCategories.request(item.shopId._id);
    });
  }, []);
  
  const handleBack = () => {
    history.push("/init-shop");
  };

  const handleSave = async () => {
    console.log("category: ", category);
    console.log("name: ", name);
    console.log("price: ", price);

    try {
      await updateItem.request(id, { price, categoryId: category, name });
    } catch (_) {}
  };

  if (singleItem.isLoading) return <></>;

  return (
    <BaseLayout>
      <div>
        <ServerError error={updateItem.error} />
        {allCategories.isLoading && <AppLoading />}
        {allCategories.data && allCategories.data.length > 0 && (
          <div class="form-group mt-3">
            <label for="category">Select Category</label>
            <select
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              {allCategories.data.map((categ) => (
                <option
                  key={categ._id}
                  value={categ._id}
                  selected={category === categ._id}
                >
                  {categ.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="form-group mt-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </div>
        <button className="btn btn-info mt-3" onClick={handleBack}>
          Back
        </button>
        {updateItem.isLoading && <p>Loading ...</p>}
        {!updateItem.isLoading && (
          <button
            className="btn btn-primary mt-3 mx-3"
            onClick={handleSave}
            disabled={!category || !price || !name}
          >
            Save
          </button>
        )}
      </div>
    </BaseLayout>
  );
}