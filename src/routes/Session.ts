import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import store from '../store';
import Controller from '../controllers/Session';
import HttpResponse from '../models/HttpResponse';

export default class SessionRouter {
	public router: Router;
	private controller: Controller;

	constructor() {
		this.router = Router();
		this.controller = new Controller();
		this.routes();
	}

	private respond(res: Response, r: HttpResponse) {
		res.status(r.status).json(r);
	}

	private routes() {
		this.router.route('/')
			.get(this.rootGet.bind(this))
			.post(this.rootPost.bind(this))
			.delete(this.rootDelete.bind(this));
		this.router.route('/:id')
			.get(this.idGet.bind(this))
			.put(this.idPut.bind(this));
	}

	private rootGet(req: Request, res: Response) {
		this.controller.getAllSessions()
			.then((r: HttpResponse) => this.respond(res, r))
			.catch((r: HttpResponse) => this.respond(res, r));
	}

	private rootPost(req: Request, res: Response) {
		this.controller.addSession(req.body)
			.then((r: HttpResponse) => this.respond(res, r))
			.catch((r: HttpResponse) => this.respond(res, r));
	}

	private rootDelete(req: Request, res: Response) {
		this.controller.deleteAll(req.body.confirm)
			.then((r: HttpResponse) => this.respond(res, r))
			.catch((r: HttpResponse) => this.respond(res, r));
	}

	private idGet(req: Request, res: Response) {
		this.controller.getSessionById(req.params.id)
			.then((r: HttpResponse) => this.respond(res, r))
			.catch((r: HttpResponse) => this.respond(res, r));
	}

	private idPut(req: Request, res: Response) {
		this.controller.updateSessionById(req.params.id, req.body)
			.then((r: HttpResponse) => this.respond(res, r))
			.catch((r: HttpResponse) => this.respond(res, r));
	}
}
