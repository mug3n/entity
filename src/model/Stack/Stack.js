/**
 * Created by mugen on 6/11/16.
 */

export class Stack {
	constructor (array) {
		this.length = 0;

		if (arguments.length > 1 || !arguments[0] instanceof Array) {
			array = arguments;
		}

		Object.assign(this, array);
		this.length = array && array.length || 0;
	}

	add () {
		return Array.prototype.push.apply(this, arguments);
	}

	remove (identifier) {
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

	every () {
		return Array.prototype.every.apply(this, arguments);
	}

	filter () {
		return Array.prototype.filter.apply(this, arguments);
	}

	find () {
		return Array.prototype.find.apply(this, arguments);
	}

	forEach () {
		return Array.prototype.forEach.apply(this, arguments);
	}

	static from () {
		return Array.from.apply(this, arguments);
	}

	static concat () {
		return Array.concat.apply(this, arguments);
	}

	static entries () {
		return Array.entries.apply(this, arguments);
	}

	static findIndex () {
		return Array.prototype.findIndex.apply(this, arguments);
	}

	some () {
		return Array.prototype.some.apply(this, arguments);
	}

	sort () {
		return Array.prototype.sort.apply(this, arguments);
	}

	static includes () {
		return Array.prototype.includes.apply(this, arguments);
	}

	static indexOf () {
		return Array.prototype.indexOf.apply(this, arguments);
	}

	static join () {
		return Array.prototype.join.apply(this, arguments);
	}

	static keys () {
		return Array.prototype.keys.apply(this, arguments);
	}

	static lastIndexOf () {
		return Array.prototype.lastIndexOf.apply(this, arguments);
	}

	static map () {
		return Array.prototype.map.apply(this, arguments);
	}

	static pop () {
		return Array.prototype.pop.apply(this, arguments);
	}

	static push () {
		return Array.prototype.push.apply(this, arguments);
	}

	static reduce () {
		return Array.prototype.reduce.apply(this, arguments);
	}

	static reverse () {
		return Array.prototype.reverse.apply(this, arguments);
	}

	static shift () {
		return Array.prototype.shift.apply(this, arguments);
	}

	static slice () {
		return Array.prototype.slice.apply(this, arguments);
	}

	static splice () {
		return Array.prototype.splice.apply(this, arguments);
	}

	static unshift () {
		return Array.prototype.unshift.apply(this, arguments);
	}

	static values () {
		return Array.prototype.values.apply(this, arguments);
	}
}