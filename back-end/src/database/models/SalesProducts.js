'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Products.belongsToMany(models.Sales, { through: 'salesProducts', foreignKey: 'product_id' });
      models.Sales.belongsToMany(models.Products, { through: 'salesProducts', foreignKey: 'sale_id' });
    }
  }
  SalesProducts.init({
    sale_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'SalesProducts',
    tableName: 'salesProducts'
  });
  return SalesProducts;
};