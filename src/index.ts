import * as express from 'express';
import { Router, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';

import store from './store';

import SessionRouter from './routes/Session';

class Server {
	public app: express.Application;
	public router: express.Router;

	constructor() {
		this.app = express();
		this.router = express.Router();
		store.init()
			.then(() => {
				this.middleware();
				this.routes();
			})
			.catch((err) => console.log(err));
	}

	private middleware(): void {
		this.app.use(bodyParser.urlencoded({extended: true}));
		this.app.use(bodyParser.json());
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			res.header('Access-Control-Allow-Origin', 'https://letsexperiment.github.io');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
			next();		  
		});
	}

	private routes(): void {
		this.router.use('/', new SessionRouter().router);
		this.app.use(`/v1`, this.router);
	}
}

export default new Server().app.listen(process.env.PORT);
