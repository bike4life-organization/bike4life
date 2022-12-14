import mongoose, { set, connect } from "mongoose";
import startPullListener from "./listener/pull-listener";
import * as express from "express";
import * as path from "path";
import { mongoConnectionSettings, publicDocSettings } from "./settings";
import { Application } from "express";
import { Server } from 'http'
import * as fs from 'fs'

class App {
  app: Application;
  server: Server;
  env: string;
  port: string | number;

  constructor() {
    this.app = express();
    this.port = publicDocSettings.port || 3333
    this.env = process.env.NODE_ENV || "development";
    this.initializeSwagger();
    this.connectToDatabase();
    startPullListener();
  }

  async listen(): Promise<Server> {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(this.port)

      this.server.once('error', err => reject(err))
      this.server.once('listening', () => resolve(this.server as Server))
    })
  }

  connectToDatabase(): void {
    if (this.env !== "production") {
      set("debug", true);
    }

    connect(mongoConnectionSettings.url, (error) => {
      if (error) {
        console.error("Error connecting to database: ", error);
        return
      }
      console.log("Connected to database!");
    });
  }

  async stop(): Promise<void> {
    await mongoose.connection.close();
  }

  private initializeSwagger(): void {
    this.app.use("/api-docs", express.static(path.join(__dirname, 'assets/docs')))
  }
}

export default App;
