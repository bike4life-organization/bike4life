import { config } from 'dotenv'
config({ path: '../../.env' })

import App from './app/app';
import IndexRoute from './app/routes/index.route';

const app = new App([new IndexRoute()])

app.listen()
