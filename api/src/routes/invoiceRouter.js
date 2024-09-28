const { Router } = require('express');
const { getInvoices } = require('../controllers/invoiceController');

const router = Router();

router.get('/', getInvoices);

module.exports = router;
