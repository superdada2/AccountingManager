import express from 'express';
import enumRouter from './enum'
import reportsRouter from './reports'


export const router = express.Router();
router.use('/enum', enumRouter);
router.use('/reports',reportsRouter)
export default router;
