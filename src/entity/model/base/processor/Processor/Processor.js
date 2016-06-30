/**
 * Created by mugen on 6/13/16.
 */

import {Stream} from '../../../../stream/Stream/Stream';

//var worker = new Worker('src/model/base/processor/Worker/Worker.js');

class Process {
	constructor (method, args) {
		this.stream = new Stream();

		worker.postMessage(
			{
				method: method,
				arguments: args
			}
		);

		return this.stream;
	}
}

class processor {
	constructor () {
		this.processes = [];
	}

	process () {
		this.processes.push(
			new Process()
		)
	}

	processed (data) {
		this.stream.carry(data);
	}
}

export let Processor = new processor();

worker.addEventListener(
	'message',
	function (e) {
		Processor.processed(e);
	}, false);
