import BaseLayout from "../layouts/base";
import FavItems from "../components/fav/fav-item-list";
import UserProfile from "../components/fav/user-profile";
import { useState } from "react";

export default function FavouritesScreen() {
  const [searchVal, setSearchVal] = useState("");

  const handleSearchVal = (e) => {
    const val = e.target.value;
    setSearchVal(val);
  };

  return (
    <BaseLayout hasSearch={false}>
      <UserProfile />
      <input
        type="text"
        className="form-control"
        placeholder="Search your favourites ..."
        value={searchVal}
        onChange={handleSearchVal}
      />
      <div className="my-3 row g-3">
        <FavItems searchVal={searchVal} />
      </div>
    </BaseLayout>
  );
}
