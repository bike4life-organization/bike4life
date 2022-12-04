import { config } from 'dotenv'
config({ path: '../../.env' })

import App from './app/app';
import IndexRoute from './app/routes/index.route';
import UsersRoute from './app/routes/users.route';

const app = new App([new IndexRoute(), new UsersRoute()])

app.listen()
