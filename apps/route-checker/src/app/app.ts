import mongoose, {set, connect} from "mongoose";
import {mongoConnectionSettings} from "../../settings";
import startPullListener from "./listener/pull.listener";

class App {
    env: string

    constructor() {
        this.env = process.env.NODE_ENV || 'development'
    }

    start(): Promise<void> {
        this.connectToDatabase();
        return startPullListener();

    }

    async stop(): Promise<void> {
        await mongoose.connection.close()
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