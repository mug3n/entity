/**
 * Created by mugen on 6/11/16.
 */

export class Depot {
	constructor (constructor) {
		this.Model = constructor;
		this.contents = new Map();
	}

	set (model) {
		this.contents.set(model.id, model);
	}

	get (id) {
		return id ? this.contents.get(id) : Array.from(this.contents, function (pair) {
			return pair[1];
		});
	}
}

