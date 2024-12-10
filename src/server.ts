import cors from 'cors'
import express, { type Express } from 'express'
import helmet from 'helmet'
import { pino } from 'pino'

import { connectDB } from './config/db'
import { router } from './router'

const logger = pino({ name: 'server start' })
const app: Express = express()
connectDB()
// Set the application to trust the reverse proxy
app.set('trust proxy', true)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
app.use(helmet())

// Add version to the API
app.use('/api/v1', router)

export { app, logger }
