const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Invoice = sequelize.define(
	'Invoice',
	{
		idInvoice: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		clientId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			// references: {
			// 	model: User,
			// 	key: 'idUser',
			// },
		},
		total: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		tableName: 'invoices',
		timestamps: false,
	}
);

User.hasMany(Invoice, { foreignKey: 'clientId' });
Invoice.belongsTo(User, { foreignKey: 'clientId' });

module.exports = Invoice;
