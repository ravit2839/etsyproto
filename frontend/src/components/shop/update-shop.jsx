import { useEffect, useState } from "react";
import * as shopApi from "../../apis/shop";
import useApi from "../../hooks/use-api";
<<<<<<< HEAD
=======
import { getImageURL } from "../../utils/app";
import AppLoading from "../loading";
>>>>>>> origin/main
import ServerError from "../server-error";

export default function UpdateShop({ onShopReceived }) {
  const [shopname, setShopname] = useState("");
  const [shopImg, setShopImg] = useState("");
  const shopDetail = useApi(shopApi.getShopDetail, { keyExtractor: "shop" });
  const updateShop = useApi(shopApi.updateShop, { hasCatchError: true });

  useEffect(() => {
    shopDetail.request().then((res) => {
      const shop = res.data.shop;
<<<<<<< HEAD
      console.log("__shop: ", shop)
=======
>>>>>>> origin/main
      setShopname(shop.name);
      onShopReceived(shop);
    });
  }, []);

<<<<<<< HEAD
  if (shopDetail.isLoading) return <></>;
=======
  if (shopDetail.isLoading) return <AppLoading />;
>>>>>>> origin/main

  if (!shopDetail.data) return <></>;

  const handleChangeInput = (e) => {
    const shopname = e.target.value;
    setShopname(shopname);
  };

  const handleChangeImage = (e) => {
    setShopImg(e.target.files[0]);
  };

  const localImageURL = () => {
    if (shopImg) {
      return URL.createObjectURL(shopImg);
    }

    return "";
  };

  const handleSubmit = async () => {
    await updateShop.request({
      name: shopname,
      image: shopImg,
<<<<<<< HEAD
      id: shopDetail.data._id,
=======
      id: shopDetail.data.id,
>>>>>>> origin/main
    });
  };

  return (
    <>
      <ServerError error={updateShop.error} />
      <form className="mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="shop_image">Shop Picture</label>
              <input
                type="file"
                className="form-control"
                id="shop_image"
                onChange={handleChangeImage}
              />
            </div>
          </div>
          <div className="col-md-6">
            {(shopImg || shopDetail.data.image) && (
              <img
                src={
<<<<<<< HEAD
                  shopImg ? localImageURL() : shopDetail.data.image
=======
                  shopImg ? localImageURL() : getImageURL(shopDetail.data.image)
>>>>>>> origin/main
                }
                alt="Shop Image"
                width="200"
              />
            )}
          </div>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="shop_name">Shop Name</label>
          <input
            type="text"
            className="form-control"
            id="shop_name"
            value={shopname}
            onChange={handleChangeInput}
          />
        </div>
<<<<<<< HEAD
        {/* {updateShop.isLoading && <AppLoading />} */}
        {!updateShop.isLoading && (
          <button style={{backgroundColor:"burlywood", color:"black"}} className="btn btn-success mt-3" onClick={handleSubmit}>
=======
        {updateShop.isLoading && <AppLoading />}
        {!updateShop.isLoading && (
          <button  style={{backgroundColor:"burlywood", color:"black"}} className="btn btn-success mt-3" onClick={handleSubmit}>
>>>>>>> origin/main
            Save Changes
          </button>
        )}
      </form>
    </>
  );
}
