import express from 'express';
import {
  getClass,
  addClass,
  getCurrency,
  addCurrency,
  getProduct,
  addProduct,
  getRevenueType,
  addRevenueType,
  getStatus,
  addStatus,
  getType,
  addType,
  getSubscription,
  addSubscription,
  getMonth,
  updateClass,
  updateCurrency,
  updateProduct,
  updateRevenueType,
  updateStatus,
  updateSubscription,
  updateType,
  update,
  add,
  deleteEnum,
  loadCountry,
  getCountry
} from './controller';

import {
  Authorize
} from '../../../Auth/Authorization'

export const router = express.Router();

router.get('/loadCountry', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 1,
    role: 1
  }, {
    type: 1,
    role: 2
  }])
}, async(req, res) => {
  try {
    const result = await loadCountry(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message;
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/update', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 2,
    role: 2
  }])
}, async(req, res) => {
  try {
    const result = await update(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message;
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/delete', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 2,
    role: 3
  }])
}, async(req, res) => {
  try {
    const result = await deleteEnum(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message;
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/add', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 2,
    role: 1
  }])
}, async(req, res) => {
  try {
    const result = await add(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message;
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.get('/all',
  async(req, res) => {
    try {
      const Class = await getClass(req.body)
      const currency = await getCurrency();
      const product = await getProduct();
      const revenueType = await getRevenueType();
      const status = await getStatus();
      const type = await getType();
      const subscription = await getSubscription();
      const month = await getMonth();
      const country = await getCountry();
      res.status(200).json({
        Class,
        currency,
        product,
        revenueType,
        status,
        type,
        subscription,
        month,
        country
      })
    } catch (err) {
      const message = err.message
      res.status(500).json({
        status: false,
        message
      })
    }
  })

router.get('/class', async(req, res) => {
  try {
    const result = await getClass(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message;
    res.status(500).json({
      status: false,
      message
    })
  }
})



router.get('/currency', async(req, res) => {
  try {
    const result = await getCurrency(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message;
    res.status(500).json({
      status: false,
      message
    })
  }
})




router.get('/product', async(req, res) => {
  try {
    const result = await getProduct(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message;
    res.status(500).json({
      status: false,
      message
    })
  }
})



router.get('/revenueType', async(req, res) => {
  try {
    const result = await getRevenueType(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message;
    res.status(500).json({
      status: false,
      message
    })
  }
})



router.get('/status', async(req, res) => {
  try {
    const result = await getStatus(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message;
    res.status(500).json({
      status: false,
      message
    })
  }
})



router.get('/type', async(req, res) => {
  try {
    const result = await getType(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message;
    res.status(500).json({
      status: false,
      message
    })
  }
})



router.get('/subscription', async(req, res) => {
  try {
    const result = await getSubscription(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message;
    res.status(500).json({
      status: false,
      message
    })
  }
})



export default router;