import { useHistory } from "react-router-dom";
import BaseLayout from "../layouts/base";
import * as shopApi from "../apis/shop";
import useApi from "../hooks/use-api";
import { useEffect, useState } from "react";
import { AppLoading, ServerError } from "../components";

export default function ShopNameScreen() {
  const shopExistsApi = useApi(shopApi.isShopExists, {
    keyExtractor: "isShopExists",
  });
  const shopAvailablity = useApi(shopApi.checkAvailablity, {
    keyExtractor: "isAvailable",
  });
  const createShop = useApi(shopApi.createNewShop, { hasCatchError: true });
  const history = useHistory();
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shopname, setShopname] = useState("");

  useEffect(() => {
    shopExistsApi.request().then((res) => {
      const isShopExists = res.data.isShopExists;
      if (isShopExists) {
        history.replace("/shop");
      }
    });
  }, []);

  const handleProceed = async () => {
    try {
      await createShop.request({ name: shopname });
      history.replace("/shop");
    } catch (_) {}
  };

  const handleChangeInput = (e) => {
    const shopname = e.target.value;

    setIsChecked(false);
    setShopname(shopname);
  };

  const handleCheckAvailablity = async () => {
    await shopAvailablity.request({ name: shopname });
    setIsChecked(true);
  };

  const shopAvailable = () => {
    const status = shopAvailablity.data;

    if (!isChecked) return <></>;

    return (
      <p className={`badge bg-${status ? "success" : "danger"}`}>
        {status ? "Available" : "Not Available"}
      </p>
    );
  };

  if (
    shopExistsApi.isLoading ||
    shopAvailablity.isLoading ||
    createShop.isLoading
  ) {
    return <AppLoading />;
  }

  return (
    <BaseLayout>
      <div className="text-center">
        <h3>Name your Shop</h3>
        <p>Choose a memorable name that reflects your style</p>
        <hr />
      </div>
      <ServerError error={createShop.error} />
      <div className="mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Shop name ..."
          value={shopname}
          onChange={handleChangeInput}
        />
        <div className="mt-2">{shopAvailable()}</div>
        {isLoading && <AppLoading />}
        {!isLoading && (
          <button className="btn btn-light" onClick={handleCheckAvailablity}>
            Check Availablity
          </button>
        )}
        {shopAvailablity.data && (
          <button className="btn btn-primary mx-3" onClick={handleProceed}>
            Proceed
          </button>
        )}
      </div>
    </BaseLayout>
  );
}
