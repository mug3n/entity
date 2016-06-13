import {Extended} from '../Extended/Extended';

export class ExtendedLevel2 extends Extended {

	static get define () {
		return {
			attachment: Extended
		}
	}

	constructor (data) {
		super(data);
	}
}