import { Application } from 'express'
import * as express from 'express'
import * as swaggerJSDoc from 'swagger-jsdoc'
import * as swaggerUi from 'swagger-ui-express'
import * as path from 'path'
import { connect, set } from 'mongoose'

import { Routes } from '@bike4life/api-interfaces'
import errorMiddleware from './middlewares/error.middleware'
import { mongoConnectionSettings } from './settings'

class App {
  app: Application
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

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`)
    })
  }

  connectToDatabase(): void {
    if (this.env !== 'production') {
      set('debug', true)
    }

    connect(mongoConnectionSettings.url, () => {
      console.log('Connected to database!')
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