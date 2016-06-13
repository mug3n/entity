/**
 * Created by mugen on 6/14/16.
 */
export class Pipe {
	constructor (handler) {
		this.handler = handler;
		this.state = 1;
	}

	carry (data) {
		if (this.state === 1) {
			this.handler(data);
		}

		return !!this.state;
	}

	open () {
		this.state = 1;
	}

	close () {
		this.state = 0;
	}
}