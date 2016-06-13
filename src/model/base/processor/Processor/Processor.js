/**
 * Created by mugen on 6/13/16.
 */

import {Stream} from '../../../../entity/stream/Stream/Stream';

class processor {
	constructor () {
		this.worker = new Worker('src/model/base/processor/Worker/Worker.js');

		this.processes = [];

		this.worker.addEventListener('message', function (e) {
			console.log('Worker said: ', this.defragment(e.data, true));
		}.bind(this), false);
	}

	process () {
		this.defragment();
	}

	defragment (stack) {
		var stream;

		stream = new Stream().pipe(
			function (defragmentedStack) {
				
				this.processes.splice(
					this.processes.indexOf(stream),
					1
				);

				return defragmentedStack.map(
					function (index) {
						return stack[index];
					}.bind(this)
				);
			}.bind(this)
		);

		this.processes.push(stream);

		this.worker.postMessage(
			{
				id: this.processes.length - 1,
				process: 'defragment',
				type: 'request',
				payload: Array.from(stack)
			}
		);

		return stream;
	}
}

export let Processor = new processor();