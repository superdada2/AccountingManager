import express from 'express';
import {getClass,addClass} from './controller';

export const router = express.Router();

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

export default router;




