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
  addStatus ,
  getType ,
  addType ,
  getSubscription ,
  addSubscription,
  getMonth,
} from './controller';

export const router = express.Router();

router.get('/all', async (req,res)=>{
  try{
    const Class = await getClass(req.body)
    const currency = await getCurrency();
    const product = await getProduct();
    const revenueType = await getRevenueType();
    const status = await getStatus();
    const type = await getType();
    const subscription = await getSubscription();
    const month = await getMonth();
    res.status(200).json({Class, currency, product, revenueType, status, type, subscription, month})
  }
  catch(err){
    const message = err.message
    res.status(500).json({
      status:false,
      message
    })
  }
})

router.get('/class',async (req, res)=>{
  try{
    const result = await getClass(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})



router.post('/class',async (req, res)=>{
  try{
    const result = await addClass(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})

router.get('/currency',async (req, res)=>{
  try{
    const result = await getCurrency(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})

router.post('/currency',async (req, res)=>{
  try{
    const result = await addCurrency(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})

router.get('/product',async (req, res)=>{
  try{
    const result = await getProduct(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})

router.post('/product',async (req, res)=>{
  try{
    const result = await addProduct(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})

router.get('/revenueType',async (req, res)=>{
  try{
    const result = await getRevenueType(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})

router.post('/revenueType',async (req, res)=>{
  try{
    const result = await addRevenueType(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})

router.get('/status',async (req, res)=>{
  try{
    const result = await getStatus(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})

router.post('/status',async (req, res)=>{
  try{
    const result = await addStatus(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})

router.get('/type',async (req, res)=>{
  try{
    const result = await getType(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})

router.post('/type',async (req, res)=>{
  try{
    const result = await addType(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})

router.get('/subscription',async (req, res)=>{
  try{
    const result = await getSubscription(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})

router.post('/subscription',async (req, res)=>{
  try{
    const result = await addSubscription(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})

router.get('/month',async (req, res)=>{
  try{
    const result = await getMonth(req.body)
    res.status(200).json(result)
  }
  catch(err){
    const message = err.message;
    res.status(500).json({
      status:false,
      message
    })
  }
})
export default router;




