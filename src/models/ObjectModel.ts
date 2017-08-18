import * as ajv from 'ajv';
import { ObjectID } from 'mongodb';

export default abstract class ObjectModel {
	public props: any;
	private schema: JsonSchema;
	private required: Array<string>;
	private validator: ajv.ValidateFunction;

	constructor(props: any, schema: JsonSchema, required?: Array<string>) {
		this.props = props;
		this.schema = schema;
		this.required = required;
		this.validator = ajv().compile(this.schema);
	}

	validate(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.validator(this.props)) {
				resolve();
			} else {
				reject('Error on validation.');
			}
		});
	}

	hasRequiredProperties(): Promise<void> {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < this.required.length; i++) {
				if (!this.props.hasOwnProperty(this.required[i])) {
					return reject({
						text: 'Missing required properties.',
						data: this.required
					});
				}
			}
			resolve();
		});
	}
}
