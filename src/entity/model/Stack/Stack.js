/**
 * Created by mugen on 6/11/16.
 */

import {Stream} from '../../stream/Stream/Stream';

export class Stack {
	constructor (array) {
		this.consolidator = new Stream('Consolidated');
		this.composing = new Stream();
		this.consolidator.pipe(
			function () {
				if (this.isComposed()) {
					this.composed();
				}
			}.bind(this)
		);
		this.length    = array && array.length || 0;

		if (array) {
			array.forEach(
				function (model) {
					this.set(model);
				}.bind(this)
			);
		}

		this.stream = new Stream();
	}

	set (model) {
		if (!this[model.id]) {
			this.length += 1;
		}

		model.composed(
			this.consolidator
		);

		this[model.id] = model;
	}

	unset (identifier) {
		identifier = typeof identifier === 'object' ? identifier.id : identifier;
		delete this[identifier];
	}

	get (id) {
		return this[id];
	}

	isComposed () {
		this.forEach(
			function (model) {
				if (!model.isComposed()) {
					return false;
				}
			}
		);

		return true;
	}

	composed (handler) {
		if (handler) {
			if (this.isComposed()) {
				this.composing.unlink().pipe(handler).carry(this);
			} else {
				this.composing.pipe(handler);
			}
		} else {
			console.count('Stack composed.');
			this.composing.route = Stream.Free;
			this.composing.carry(this);
		}

		return this;
	}

	filter (filter) {
		return Object.keys(this)
			.filter(
				function (key) {
					filter(this[key], key);
				}.bind(this)
			)
			.map(
				function (key) {
					return this[key];
				}.bind(this)
			);
	}

	forEach (handler) {
		Object.keys(this).forEach(
			function (key) {
				if (!(this[key] instanceof Stream) && typeof this[key] === 'object') {
					handler(this[key], key);
				}
			}.bind(this)
		);
	}

	toArray () {
		var array = [];

		this.forEach(
			function (model) {
				array.push(model);
			}
		);

		return array;
	}
}