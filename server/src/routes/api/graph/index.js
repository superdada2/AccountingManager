import express from 'express';
import {
  BillByCustomer,
  BillByClass,
  BillByCurrency,
  BillByBillingMonth,
  BillByMonthInvoiced,
  BillByProduct,
  BillByRevenueType,
  BillByType,
  BillByCountry,
  BillByStatus
} from './controller'

import {
  Authorize
} from '../../../Auth/Authorization'


export const router = express.Router()
router.post('/billByCustomer', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 3,
    role: 1
  }])
}, async(req, res) => {
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

router.post('/billByRevenueType', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 3,
    role: 1
  }])
}, async(req, res) => {
  try {
    console.log(req.body)
    const result = await BillByRevenueType(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/billByType', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 3,
    role: 1
  }])
}, async(req, res) => {
  try {
    console.log(req.body)
    const result = await BillByType(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/billByStatus', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 3,
    role: 1
  }])
}, async(req, res) => {
  try {
    console.log(req.body)
    const result = await BillByStatus(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})
router.post('/billByProduct', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 3,
    role: 1
  }])
}, async(req, res) => {
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

router.post('/billByCountry', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 3,
    role: 1
  }])
}, async(req, res) => {
  try {
    console.log(req.body)
    const result = await BillByCountry(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})
router.post('/billByCurrency', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 3,
    role: 1
  }])
}, async(req, res) => {
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
router.post('/billByClass', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 3,
    role: 1
  }])
}, async(req, res) => {
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

router.post('/billByBillingMonth', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 3,
    role: 1
  }])
}, async(req, res) => {
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