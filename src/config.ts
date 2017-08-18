export default {
	server: {
		version: 1,
		port: 3000
	},
	database: {
		path: '~/mongodb',
		host: 'localhost',
		name: 'letsexperiment',
		port: 12345,
		getUrl: function(): string {
			return `mongodb://${this.host}:${this.port}/${this.name}`;
		}
	},
	auth: {
		secret: 'contra'
	}
}
