import { config } from 'dotenv'
config({ path: '../../.env' })

import App from './app/app';
import IndexRoute from './app/routes/index.route';
import RoutesRoute from './app/routes/routes.route';

const app = new App([new IndexRoute(),  new RoutesRoute()])

app.listen()
