const config = require("config");
const { Sequelize } = require("sequelize");
const user = require("./user");
const shop = require("./shop");
const itemCategory = require("./item-category");
const item = require("./item");
const purchase = require("./purchases");
const itemImage = require("./item-image");
const favorite = require("./favorite");

const sequelize = new Sequelize({ ...config.get("db") });

// initialized all the models here..
user.initModel(sequelize);
shop.initModel(sequelize);
itemCategory.initModel(sequelize);
item.initModel(sequelize);
purchase.initModel(sequelize);
itemImage.initModel(sequelize);
favorite.initModel(sequelize);

const db = {};
db.sequelize = sequelize;
db.User = user.User;
db.Shop = shop.Shop;
db.ItemCategory = itemCategory.ItemCategory;
db.Item = item.Item;
db.Purchase = purchase.Purchase;
db.ItemImage = itemImage.ItemImage;
db.Favorite = favorite.Favorite;

// relations
db.ItemCategory.hasMany(db.Item, { foreignKey: "category_id" });
db.Shop.hasMany(db.Item, { foreignKey: "shop_id" });
db.Item.hasMany(db.ItemImage, { foreignKey: "item_id" });
db.Item.belongsTo(db.Shop);
db.Item.belongsTo(db.ItemCategory, { foreignKey: "category_id" });
// for-favs
db.Item.hasMany(db.Favorite, { foreignKey: "item_id" });
db.User.hasMany(db.Favorite, { foreignKey: "user_id" });
db.Favorite.belongsTo(db.Item);
// for-shops
db.User.hasOne(db.Shop, { foreignKey: "user_id" });
// shop-itemCategory
db.Shop.hasMany(db.ItemCategory, { foreignKey: "shop_id" });
// user-purchase
db.User.hasMany(db.Purchase, { foreignKey: "user_id" });
// shop-purchase
db.Shop.hasMany(db.Purchase, { foreignKey: "shop_id" });
db.Purchase.belongsTo(db.Shop);

module.exports = db;
