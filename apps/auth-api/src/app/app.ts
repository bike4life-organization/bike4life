import { Application } from 'express'
import * as express from 'express'
import * as swaggerJSDoc from 'swagger-jsdoc'
import * as swaggerUi from 'swagger-ui-express'
import * as path from 'path'
import mongoose, { connect, set } from 'mongoose'

import { Routes } from '@bike4life/api-interfaces'
import errorMiddleware from './middlewares/error.middleware'
import { mongoConnectionSettings } from './settings'
import { Server } from 'http'

class App {
  app: Application
  server: Server
  env: string
  port: string | number

  constructor(routes: Routes[]) {
    this.app = express()
    this.port = process.env.PORT || 3333
    this.env = process.env.NODE_ENV || 'development'

    this.connectToDatabase()
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeSwagger()
    this.initializeErrorHandling()
  }

  async listen(): Promise<Server> {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(this.port)

      this.server.once('error', err => reject(err))
      this.server.once('listening', () => resolve(this.server as Server))
    })
  }

  async stop(): Promise<void> {
    await new Promise((resolve) => {
      if (!this.server) {
        return resolve(true)
      }

      this.server.once('close', () => {
        this.server = undefined
        resolve(true)
      })
      this.server.close()
    })
    await mongoose.connection.close()
  }

  connectToDatabase(): void {
    if (this.env === 'development') {
      set('debug', true)
    }

    connect(mongoConnectionSettings.url, (error) => {
      if (error) {
        console.log('Error connecting to database: ', error)
      } else {
        console.log('Connected to database')
      }
    })
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private initializeRoutes(routes: Routes[]): void {
    routes.forEach((route) => {
      this.app.use('/', route.router)
    })
  }

  private initializeSwagger(): void {
    const options = {
      failOnErrors: true,
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Hello World',
          version: '1.0.0',
        },
      },
      apis: [path.join(__dirname, 'swagger.yaml')],
    }

    const specs = swaggerJSDoc(options)
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware)
  }

}

export default App