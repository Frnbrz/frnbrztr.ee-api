import express, { type Router } from 'express'

export const router: Router = express.Router()

router.get('/', (_req, res) => {
  res.send('Hello World!')
})

router.get('/ping', (_req, res) => {
  res.send('pong')
})

router.get('/health', (_req, res) => {
  res.send('ok')
})
