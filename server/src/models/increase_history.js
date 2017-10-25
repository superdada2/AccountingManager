/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('increase_history', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    entryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'invoice',
        key: 'id'
      }
    },
    increasePercentage: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'increase_history'
  });
};
