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
		partnerOneQuestions: {
			type: 'array'
		},
		partnerTwoQuestions: {
			type: 'array'
		},
		partnerOneIsDone: {
			type: 'boolean'
		},
		partnerTwoIsDone: {
			type: 'boolean'
		},
		partnerOneCurrentGroup: {
			type: 'number'
		},
		partnerTwoCurrentGroup: {
			type: 'number'
		},
		showTransfer: {
			type: 'boolean'
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
