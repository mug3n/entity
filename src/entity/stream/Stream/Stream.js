/**
 * Created by mugen on 6/13/16.
 */
import {Pipe} from '../Pipe/Pipe';

export class Stream {

	static get Consolidated () {
		return function (data, source) {
			this.sourced.set(source, data);
			if (this.sources.length === this.sourced.size) {
				this.route = this.constructor.Free;
				this.carry(data);
				this.sourced.clear();
				this.route = this.constructor.Consolidated;
			}
		};
	}

	static get Free () {
		return function (data, pipes) {
			pipes = pipes || this.pipes;

			pipes.forEach(
				function (pipe) {
					pipe.carry(data, this);
				}.bind(this)
			);
		}
	}

	set route (route) {
		this._route = typeof route === 'string' ? this.constructor[route] : route;
	}

	get route () {
		return this._route;
	}

	constructor (route) {
		this.route   = route || this.constructor.Free;
		this.sources = [];
		this.sourced = new Map();
		this.pipes   = [];
	}

	pipe (handler) {
		if (handler instanceof Stream) {
			handler.sources.push(this);
		} else {
			handler = new Pipe(handler, this);
		}

		this.pipes.push(
			handler
		);

		return this;
	}

	carry (data) {
		this.route.apply(this, arguments);
		return this;
	}

	unlink () {
		this.sourced.clear();
		this.sources = [];
		this.pipes = [];
		return this;
	}
}