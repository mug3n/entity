/**
 * Created by mugen on 6/11/16.
 */

export class Stack extends Array {
	constructor (array) {
		super();

		this.constructor.prototype.fetch = this.constructor.prototype.fetch || function (id) {
				return this.find(
					function (element) {
						return element.id === id;
					}
				)
			};

		if (arguments.length === 1 && arguments[0] instanceof Array) {
			return this.constructor.apply(this, array);
		} else {
			return this.constructor.apply(this, arguments);
		}
	}
}