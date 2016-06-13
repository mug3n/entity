/**
 * Created by mugen on 6/13/16.
 */
import {Pipe} from '../Pipe/Pipe';

export class Stream {
	constructor () {
		this.pipes = [];
	}

	pipe (handler) {
		this.pipes.push(
			new Pipe(handler)
		);
	}

	pour (data) {
		this.pipes.forEach(
			function (pipe) {
				pipe.carry(data);
			}
		)
	}

	//flow () {
	//
	//}
}