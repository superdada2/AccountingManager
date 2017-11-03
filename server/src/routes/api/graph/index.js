import express from 'express';
import {
  BillByCustomer,
  BillByClass,
  BillByCurrency,
  BillByBillingMonth,
  BillByMonthInvoiced,
  BillByProduct
} from './controller'

export const router = express.Router()
router.get('/billByCustomer', async(req, res) => {
  try {
    console.log(req.body)
    const result = await BillByCustomer(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})
router.get('/billByProduct', async(req, res) => {
  try {
    console.log(req.body)
    const result = await BillByProduct(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})
router.get('/billByCurrency', async(req, res) => {
  try {
    console.log(req.body)
    const result = await BillByCurrency(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})
router.get('/billByClass', async(req, res) => {
  try {
    console.log(req.body)
    const result = await BillByClass(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/billByBillingMonth', async(req, res) => {
  try {
    console.log(req.body)
    const result = await BillByBillingMonth(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})

export default router