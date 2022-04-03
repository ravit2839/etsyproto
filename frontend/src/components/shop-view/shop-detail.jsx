import { getImageURL } from "../../utils/app";

export default function ShopDetail({ shop }) {
  return (
    <>
      <form className="mt-4">
        <div className="row">
          <div className="col-md-12">
            {!shop.image && (
              <p className="alert alert-info">
                No image uploaded for this shop yet
              </p>
            )}
            {shop.image && (
              <img src={shop.image} alt="Shop Image" width="200" />
            )}
          </div>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="shop_name">Shop Name</label>
          <input
            type="text"
            className="form-control"
            id="shop_name"
            value={shop.name}
            readOnly
          />
        </div>
      </form>
    </>
  );
}
