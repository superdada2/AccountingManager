import express from 'express';
import passport from 'passport';
import {
  login,
  register
} from './controller';

export const router = express.Router()
router.post('/login', async(req, res) => {
  try {

    const result = await login(req.body)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/register', async(req, res) => {
  try {

    const result = await register(req.body)
    console.log(result)
    res.status(200).json(result)
  } catch (err) {
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})

router.post('/test', passport.authenticate('auth', {
  session: false
}), (req, res) => {
  try {
    res.status(200).json("success")
  } catch (err) {
    const message = err.message
    res.status(500).json({
      status: false,
      message
    })
  }
})

export default router