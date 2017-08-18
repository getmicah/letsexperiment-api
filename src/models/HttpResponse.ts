export default class HttpResponse {
	status: number;
	type: string;
	message: any;

	constructor(
		status: 200 | 400 | 500, 
		type: 'Success' | 'InvalidQueryParameterValue' | 'InvalidInput' | 'Database' | 'Authentication', 
		message: any
	) {
		this.status = status;
		this.type = type;
		this.message = message;
	}
}