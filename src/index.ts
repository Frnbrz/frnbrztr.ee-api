import express, { type Express } from 'express'
import { pino } from 'pino'
import { a } from 'vitest/dist/chunks/suite.B2jumIFP'

const logger = pino({ name: 'server start' })
const app: Express = express()

// Set the application to trust the reverse proxy
app.set('trust proxy', true)

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.get('/health', (_req, res) => {
  res.send('OK')
})

const server = app.listen(process.env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = process.env
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`)
})

const onCloseSignal = () => {
  logger.info('sigint received, shutting down')
  server.close(() => {
    logger.info('server closed')
    process.exit()
  })
  setTimeout(() => process.exit(1), 10000).unref() // Force shutdown after 10s
}

process.on('SIGINT', onCloseSignal)
process.on('SIGTERM', onCloseSignal)
