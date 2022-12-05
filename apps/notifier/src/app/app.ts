import mongoose, { set, connect } from "mongoose";
import startPullListener from "./listener/pull-listener";
import { mongoConnectionSettings } from "./settings";

class App {
  env: string
  
  constructor() {
    this.env = process.env.NODE_ENV || "development";
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
}

export default App;
