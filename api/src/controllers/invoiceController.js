const Invoice = require('../models/invoiceModel');
const User = require('../models/userModel');

exports.getInvoices = async (req, res) => {
	try {
		const invoices = await Invoice.findAll({
			include: {
				model: User,
				attributes: ['idUser', 'username', 'name'],
			},
		});
		res.json(invoices);
	} catch (error) {
		console.log('Error al obtener las facturas:', error);

		res.status(500).json({
			error: 'Error al obtener las facturas',
			details: error.message,
		});
	}
};
