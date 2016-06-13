/**
 * Created by mugen on 6/11/16.
 */
import {Base} from '../../model/base/Base/Base';
import {Stack} from '../../model/Stack/Stack';

export class Model {
	constructor (data) {
		Object.assign(this, data);
		this.composed = false;
		this.compose();
		this.constructor.depot.set(this);
	}

	static get define () {
		return {}
	}

	static get depot () {
		return Base.depot(this);
	}

	static findOne (id) {
		var promise;

		promise = new Promise(
			function (resolve) {
				if (this.depot.get(id)) {
					setTimeout(
						function () {
							resolve(this.depot.get(id));
						}.bind(this)
					)
				} else {
					// here goes api call
					setTimeout(
						function () {
							resolve(this.depot.get(id));
						}.bind(this)
					)
				}
			}.bind(this)
		);

		return promise;
	}

	static findAll () {
		var promise;

		promise = new Promise(
			function (resolve) {
				// here goes api call
				setTimeout(
					function () {
						resolve(new Stack(this.depot.get()));
					}.bind(this)
				)
			}.bind(this)
		);

		return promise;
	}

	static isComposite (key) {
		return !!this.define[key];
	}

	compose () {
		let composition;

		composition = new Map();

		Object.keys(this.constructor.define).forEach(
			function (key) {
				var value;

				value = this[key];

				if (this.constructor.isComposite(key) && !value.composed) {
					composition.set(
						key,
						this.constructor.define[key].findOne(value.id).then(
							function (composed) {
								this[key] = composed;
								composition.delete(key);
								if (!composition.size) {
									this.composed = true;
								}
							}.bind(this)
						)
					)
				}
			}.bind(this)
		);

		if (!composition.size) {
			this.composed = true;
		}
	}

	properties () {
		return Object.keys(this);
	}
}