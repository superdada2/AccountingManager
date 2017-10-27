import express from 'express';
import {CreateInvoice, GetInvoice} from './controller'

export const router = express.Router()
router.post('/createInvoice',async (req, res)=>{
  try{
    console.log(req.body)
    const result = await CreateInvoice(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/getInvoice',async(req, res)=>{
  try{
    const result = await GetInvoice(req.body)

    res.status(200).json(result)
  }
  catch(err){
    const message = err.message
    console.log(message)
    res.status(500).json({
      status: false,
      message
    })
  }
})

export default router;