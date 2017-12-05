import express from 'express';
import {
  CreateInvoice,
  GetInvoice,
  getProductTable,
  getClassTable,
  loadData,
  getDistinctCustomerName,
  getDistinctInvoiceNumber,
  UpdateInvoiceDescription,
  DeleteInvoice,
  ModifyInvoice,
  GetIncomeDeferred,
  ModifyIncomeDeferred,
  loadData2,
  GetHistory,
  getDistinctUserName
} from './controller'

import {
  Authorize
} from '../../../Auth/Authorization'

export const router = express.Router()

router.post('/getHistory', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 4,
    role: 2
  }])
}, async(req, res) => {
  try {
    console.log(req.body)
    const result = await GetHistory(req.body)
    res.status(200).json(result)
  } catch (err) {

    const message = err.message
    console.log("error", message)
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.get('/getUsername', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 4,
    role: 2
  }])
}, async(req, res) => {
  try {
    console.log(req.body)
    const result = await getDistinctUserName(req.body)
    res.status(200).json(result)
  } catch (err) {

    const message = err.message
    console.log("error", message)
    res.status(500).json({
      status: false,
      message
    })
  }
})
router.post('/updateDescription', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 1,
    role: 2
  }])
}, async(req, res) => {
  try {
    console.log(req.body)
    const result = await UpdateInvoiceDescription(req.body, req.user.username)
    res.status(200).json(result)
  } catch (err) {

    const message = err.message
    console.log("error", message)
    res.status(500).json({
      status: false,
      message
    })
  }
})
router.post('/deleteInvoice', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 1,
    role: 3
  }])
}, async(req, res) => {
  try {
    const result = await DeleteInvoice(req.body, req.user.username)
    res.status(200).json(result)
  } catch (err) {

    const message = err.message
    console.log("error", message)
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/getIncomeDeferred', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 1,
    role: 4
  }])
}, async(req, res) => {
  try {
    console.log(req.body)
    const result = await GetIncomeDeferred(req.body)
    res.status(200).json(result)
  } catch (err) {

    const message = err.message
    console.log("error", message)
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/modifyIncomeDeferred', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 1,
    role: 2
  }])
}, async(req, res) => {
  try {
    console.log(req.body)
    const result = await ModifyIncomeDeferred(req.body, req.user.username)
    res.status(200).json(result)
  } catch (err) {

    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/modifyInvoice', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 1,
    role: 2
  }])
}, async(req, res) => {
  try {
    const result = await ModifyInvoice(req.body, req.user.username)
    res.status(200).json(result)
  } catch (err) {

    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/createInvoice', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 1,
    role: 1
  }])
}, async(req, res) => {
  try {
    const result = await CreateInvoice(req.body, req.user.username)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.get('/getCustomerName', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 1,
    role: 1
  }, {
    type: 1,
    role: 2
  }, {
    type: 1,
    role: 4
  }, {
    type: 3,
    role: 1
  }, {
    type: 5,
    role: 1
  }])
}, async(req, res) => {
  try {
    const result = await getDistinctCustomerName(req.body)
    res.status(200).json(result)
  } catch (err) {

    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.get('/getInvoiceNumber', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 1,
    role: 1
  }, {
    type: 1,
    role: 2
  }, {
    type: 1,
    role: 4
  }, {
    type: 3,
    role: 1
  }, {
    type: 5,
    role: 1
  }])
}, async(req, res) => {
  try {
    const result = await getDistinctInvoiceNumber(req.body)
    res.status(200).json(result)
  } catch (err) {

    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/getInvoice', (req, res, next) => {
  Authorize(req, res, next, [{
    type: 1,
    role: 4
  }, {
    type: 5,
    role: 1
  }])
}, async(req, res) => {
  try {
    const result = await GetInvoice(req.body)

    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/getProductTable', (req, res, next) => {
  Authorize(req, res, next, {
    type: 5,
    role: 1
  })
}, async(req, res) => {
  try {
    const result = await getProductTable(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    console.log(err)
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/getClassTable', (req, res, next) => {
  Authorize(req, res, next, {
    type: 5,
    role: 1
  })
}, async(req, res) => {
  try {
    const result = await getClassTable(req.body)

    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    console.log(err)
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.get('/loadData', async(req, res) => {
  try {
    const result = await loadData(req.body)

    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    console.log(err)
    res.status(500).json({
      status: false,
      message
    })
  }
})
export default router;