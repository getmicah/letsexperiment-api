import { MongoClient, MongoError, Db } from 'mongodb';

import config from './config';

class Store {
	public db: Db;
	public secret: string;

	public init(): Promise<MongoError> {
		return new Promise((resolve, reject) => {
			MongoClient.connect(process.env.MONGODB_URI)
				.then((db) => {
					this.db = db;
					this.secret = config.auth.secret;
					resolve();
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}

export default new Store();
