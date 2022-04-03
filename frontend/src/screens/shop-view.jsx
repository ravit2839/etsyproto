import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseLayout from "../layouts/base";
import ShopDetail from "../components/shop-view/shop-detail";
import * as shopApi from "../apis/shop";
import useApi from "../hooks/use-api";
import { AppLoading } from "../components";
import ShopViewItems from "../components/shop-view/shop-view-items";
import "./css/shope.css"

export default function ShopViewScreen() {
  const [searchVal, setSearchVal] = useState("");
  const { shopId } = useParams();
  const singleShop = useApi(shopApi.getSingleShopDetail, {
    keyExtractor: "shop",
  });

  useEffect(() => {
    singleShop.request(shopId);
  }, []);

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };

  if (singleShop.isLoading) return <></>;

  if (!singleShop.data) return <></>;

  console.log("single-shop-detail: ", singleShop.data);

  return (
    <BaseLayout className="shopee"  hasSearch={false}>
      <h3 className="text-center">Shop</h3>
      <hr />
      <ShopDetail shop={singleShop.data.shop} />
      <hr />

      <div className="mt-5">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search items .."
              value={searchVal}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="row g-3 mt-2">
          <ShopViewItems items={singleShop.data.items} searchVal={searchVal} />
        </div>
      </div>
    </BaseLayout>
  );
}
