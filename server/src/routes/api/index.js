import express from 'express';
import enumRouter from './enum'
import reportsRouter from './reports'
import graphRouter from './graph'


export const router = express.Router();
router.use('/enum', enumRouter);
router.use('/reports',reportsRouter)
router.use('/graph',graphRouter)
export default router;
