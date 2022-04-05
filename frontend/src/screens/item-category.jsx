import BaseLayout from "../layouts/base";
import * as shopApi from "../apis/shop";
import * as itemCategoryApi from "../apis/item-category";
import useApi from "../hooks/use-api";
import { useEffect, useState } from "react";
<<<<<<< HEAD
import { ServerError } from "../components";
=======
import { AppLoading, ServerError } from "../components";
>>>>>>> origin/main
import { Link } from "react-router-dom";

export default function ItemCategoryScreen() {
  const [newAddedCateg, setNewAddedCateg] = useState();
  const shopDetailApi = useApi(shopApi.getShopDetail, {
    keyExtractor: "shop",
  });

  useEffect(() => {
    shopDetailApi.request();
  }, []);

  const handleNewCategAdded = (category) => {
    setNewAddedCateg(category);
  };

<<<<<<< HEAD
  if (shopDetailApi.isLoading) return <></>;
=======
  if (shopDetailApi.isLoading) return <AppLoading />;
>>>>>>> origin/main

  if (!shopDetailApi.data) {
    return (
      <BaseLayout>
        <div className="alert alert-danger">
          <p>You first need to create shop in order to create item category</p>
          <Link to="/init-shop">Create Shop</Link>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <CreateNewCategory
        shop={shopDetailApi.data}
        onNewCategAdded={handleNewCategAdded}
      />
      <hr />
      <CategoryList shop={shopDetailApi.data} newCateg={newAddedCateg} />
    </BaseLayout>
  );
}

function CreateNewCategory({ shop, onNewCategAdded }) {
  const newCategoryApi = useApi(itemCategoryApi.createNewCategory, {
    hasCatchError: true,
  });
  const [categName, setCateName] = useState("");

  const handleAddCategory = async () => {
    try {
      const res = await newCategoryApi.request({
        name: categName,
<<<<<<< HEAD
        shopId: shop._id,
=======
        shopId: shop.id,
>>>>>>> origin/main
      });
      const newCateg = res.data.category;
      onNewCategAdded(newCateg);
      setCateName("");
    } catch (_) {}
  };

  return (
    <>
      <div className="my-3">
        <ServerError error={newCategoryApi.error} />
      </div>
      <div className="row">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Item Category Name e.g. Entertainment ..."
            value={categName}
            onChange={(e) => setCateName(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-success" onClick={handleAddCategory}>
            Add
          </button>
        </div>
      </div>
    </>
  );
}

function CategoryList({ shop, newCateg }) {
  const [categories, setCategories] = useState([]);
  const categoryiesApi = useApi(itemCategoryApi.getAllCategories);

  useEffect(() => {
<<<<<<< HEAD
    categoryiesApi.request(shop._id).then((res) => {
=======
    categoryiesApi.request(shop.id).then((res) => {
>>>>>>> origin/main
      const categories = res.data.categories;
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    if (newCateg) {
      const newCategs = [...categories, newCateg];
      setCategories(newCategs);
    }
  }, [newCateg]);

<<<<<<< HEAD
  if (categoryiesApi.isLoading) return <></>;
=======
  if (categoryiesApi.isLoading) return <AppLoading />;
>>>>>>> origin/main

  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((categ) => (
<<<<<<< HEAD
          <tr key={categ._id}>
            <td>{categ._id}</td>
=======
          <tr key={categ.id}>
            <td>{categ.id}</td>
>>>>>>> origin/main
            <td>{categ.name}</td>
            {/* <td>
              <i className="fa fa-times pointer" aria-hidden="true" />
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
