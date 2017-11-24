/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true

        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        tableName: 'user'
    });
};