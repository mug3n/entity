/**
 * Created by mugen on 6/11/16.
 */
import {Entity} from './entity/Entity/Entity';
import {Stream} from './entity/stream/Stream/Stream';

class Application {
	constructor () {
		this.entity = new Entity();

		this.worker = new Worker('dist/worker.js');

		this.Input = new Stream();

		this.Input.pipe(
			function (message) {
				console.log(message);
			}
		);

		this.Output = new Stream();

		this.Output.pipe(
			function (message) {
				this.worker.postMessage(message);
			}.bind(this)
		);

		this.worker.addEventListener('message', function (message) {
			this.Input.carry(JSON.parse(message.data));
		}.bind(this), false);

		console.log('Up!');
	}
}

window.app = new Application();

