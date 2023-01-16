import {config} from 'dotenv'
import App from "./app/app";
import RoutesPlace from "./app/routes/routes.place";
import IndexRoute from "./app/routes/index.route";
config({path: '../../.env'})

const app = new App([new IndexRoute(), new RoutesPlace()]);
app.start();