/**
 * Created by mugen on 6/11/16.
 */

export class Depot {
	constructor (constructor) {
		this.Model = constructor;
		this.fragment = new Map();
	}

	deposit (model) {
		this.fragment.set(model.id, model);
	}

	withdraw (id) {
		return id ? this.fragment.get(id) : Array.from(this.fragment, function (pair) {
			return pair[1];
		});
	}
}

