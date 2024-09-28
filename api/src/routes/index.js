const { Router } = require('express');
const userRouter = require('./userRouter');
const invoiceRouter = require('./invoiceRouter');

const router = Router();

router.use('/users', userRouter);
router.use('/invoices', invoiceRouter);

module.exports = router;
