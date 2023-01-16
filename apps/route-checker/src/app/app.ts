import {Application} from "express";
import * as express from "express";
import * as cors from 'cors'
import * as path from 'path'
import * as swaggerJSDoc from 'swagger-jsdoc'
import * as swaggerUi from 'swagger-ui-express'
import mongoose, {set, connect} from "mongoose";
import {apiSettings, mongoConnectionSettings} from "../../settings";
import startPullListener from "./listener/pull.listener";
import {Routes} from "@bike4life/api-interfaces";
import errorMiddleware from "./middlewares/error.middleware";

class App {
    app: Application
    env: string
    port: string | number
    routes: Routes[]

    constructor(routes: Routes[]) {
        this.app = express()
        this.port = apiSettings.port || 3333
        this.env = process.env.NODE_ENV || 'development'
        this.routes = routes
        this.start();
    }

    start(): void {
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeSwagger();
        this.initializeErrorHandling();
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`)
        })
        startPullListener().then();
    }

    async stop(): Promise<void> {
        await mongoose.connection.close()
    }

    private initializeRoutes(): void {
        this.routes.forEach((route) => {
            this.app.use('/', route.router)
        })
    }

    private initializeMiddlewares(): void {
        this.app.use(cors({
            origin: '*'
        }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
    }

    private initializeErrorHandling(): void {
        this.app.use(errorMiddleware)
    }

    private initializeSwagger(): void {
        const options = {
            failOnErrors: true,
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'REST API Docs',
                    version: '1.0.0',
                },
            },
            apis: [path.join(__dirname, 'swagger.yaml')],
        }

        const specs = swaggerJSDoc(options)
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
    }

    connectToDatabase(): void {
        if (this.env === 'development')
            set('debug', true)
        connect(mongoConnectionSettings.url, (error) => {
            if (error)
                console.log('Error connecting to database: ', error)
            else
                console.log('Connected to database')
        })
    }

}

export default App