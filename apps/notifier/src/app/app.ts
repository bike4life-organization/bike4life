import mongoose, { set, connect } from "mongoose";
import startPullListener from "./listener/pull-listener";
import * as express from "express";
import * as swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import * as path from "path";
import { mongoConnectionSettings } from "./settings";
import { Application } from "express";

class App {
  app: Application;
  env: string;

  constructor() {
    this.app = express();
    this.env = process.env.NODE_ENV || "development";
    this.initializeSwagger();
  }

  listen(): Promise<void> {
    this.connectToDatabase();
    return startPullListener();
  }

  connectToDatabase(): void {
    if (this.env !== "production") {
      set("debug", true);
    }

    connect(mongoConnectionSettings.url, () => {
      console.log("Connected to database!");
    });
  }

  async stop(): Promise<void> {
    await mongoose.connection.close();
  }

  private initializeSwagger(): void {
    const options = {
      failOnErrors: true,
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Hello World",
          version: "1.0.0",
        },
      },
      apis: [path.join(__dirname, "swagger.yaml")],
    };

    const specs = swaggerJSDoc(options);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }
}

export default App;
