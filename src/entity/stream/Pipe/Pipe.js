/**
 * Created by mugen on 6/14/16.
 */
export class Pipe {
	constructor (handler, stream) {
		this.handler = handler;
		this.stream = stream;
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

	unlink () {
		this.stream.pipes.splice(this.stream.pipes.indexOf(this), 1);
		return this;
	}
}