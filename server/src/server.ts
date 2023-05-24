import 'dotenv/config'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'

import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(cors, {
  origin: true, // All URLs are allowed
})

app.register(jwt, {
  secret: 'spacetime', // Token signature
})

app.register(authRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP Server running on port 3333')
  })
