/**
 * Created by mugen on 6/11/16.
 */

import {Stream} from '../../stream/Stream/Stream';

export class Stack {
	constructor (array) {
		this.length = 0;

		if (arguments.length > 1 || !arguments[0] instanceof Array) {
			array = arguments;
		}

		this.length = array && array.length || 0;

		if (array) {

			array = array.reduce(
				function (lastValue, currentValue) {
					lastValue[currentValue.id] = currentValue;
					return lastValue;
				},
				{}
			);

			Object.assign(this, array);

		}

		this.stream = new Stream();
	}

	set (model) {
		if (!this[model.id]) {
			this.length += 1;
		}
		this[model.id] = model;

	}

	unset (identifier) {
		var index;

		identifier = typeof identifier === 'object' ? identifier.id : identifier;

		index = this.constructor.findIndex.call(
			this,
			function (item) {
				return item && item.id === identifier;
			}
		);

		this[index] = null;
	}

	get (id) {
		return this.constructor.find.call(
			this,
			item => item.id === id
		)
	}

	compose () {
		this.constructor.map.call(
			this,
			function (item) {
				return item.compose();
			}
		)
	}

	static findIndex () {
		return Array.prototype.findIndex.apply(this, arguments)
	}

	filter () {
		return Array.prototype.filter.apply(this, arguments);
	}

	static find () {
		return Array.prototype.find.apply(this, arguments);
	}

	forEach () {
		return Array.prototype.forEach.apply(this, arguments);
	}
}