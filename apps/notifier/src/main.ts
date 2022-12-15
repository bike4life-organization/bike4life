import { config } from 'dotenv'
import App from './app/app'
config({ path: '../../.env' })

const app = new App();
app.listen();