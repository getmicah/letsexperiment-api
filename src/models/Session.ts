import ObjectModel from './ObjectModel';
import { utc } from 'moment';

const sessionSchema: JsonSchema = {
	properties: {
		partnerOneNickname: {
			type: 'string'
		},
		partnerTwoNickname: {
			type: 'string'
		},
		partnerOneAnswers: {
			type: 'array'
		},
		partnerTwoAnswers: {
			type: 'array'
		},
		created_at: {
			type: 'string'
		}
	},
	additionalProperties: false
}

export default class User extends ObjectModel {
	constructor(props: any, required?: Array<string>) {
		super(props, sessionSchema, required);
		this.props.created_at = utc(new Date()).toISOString();
	}
}
