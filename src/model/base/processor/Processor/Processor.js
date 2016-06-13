/**
 * Created by mugen on 6/13/16.
 */

import {Stack} from '../../../Stack/Stack';
import {Extended} from '../../../extended/Extended/Extended';
import {ExtendedLevel2} from '../../../extended/ExtendedLevel2/ExtendedLevel2';

function extendedFactory () {
	return new ExtendedLevel2(
		{
			id: parseInt(Math.random() * 100000000),
			a: Math.random() < .5,
			b: Math.random().toString(36).substring(7),
			attachment: new Extended(
				{
					id: parseInt(Math.random() * 100000000)
				}
			)
		}
	)
}

class processor {

	get [Symbol.toStringTag] () {
		return this.constructor.name;
	}

	constructor () {
		this.worker = new Worker('src/model/base/processor/Worker/Worker.js');

		this.worker.addEventListener('message', function (e) {
			console.log('Worker said: ', this.defragment(e.data.payload, true));
		}.bind(this), false);
	}

	process () {
		this.defragment();
	}

	defragment (data, response) {

		if (response) {
			return data.map(
				function (element) {
					return this.stack[element];
				}.bind(this)
			)
		}

		this.stack = new Stack(
			extendedFactory(),
			null,
			null,
			extendedFactory(),
			null,
			extendedFactory(),
			extendedFactory(),
			null,
			extendedFactory()
		);
		this.worker.postMessage(
			{
				process: 'defragment',
				type: 'request',
				payload: Array.from(this.stack)
			}
		); // Send data to our worker.
	}
}

export let Processor = new processor();