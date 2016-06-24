/**
 * Created by mugen on 6/11/16.
 */
import {Base} from '../../model/base/Base/Base';
import {Stream} from '../../stream/Stream/Stream';

export class Model {
	constructor (data) {
		this.stream = new Stream();

		Object.defineProperties(
			this,
			Object.keys(data).reduce(
				function (previous, current) {
					let privateValue;

					previous[current] = {
						set: function (value) {
							privateValue = value;
							this.stream.pour(this);
						}.bind(this),
						get: function () {
							return privateValue;
						}
					};
					return previous;
				}.bind(this),
				{}
			)
		);

		for (let key of Object.keys(data)) {
			this[key] = data[key];
		}

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
		if (this.depot.get(id)) {
			setTimeout(
				function () {
					this.depot.get(id).stream.pour(this.depot.get(id));
				}.bind(this)
			)
		} else {
			// here goes api call
			setTimeout(
				function () {
					this.depot.get(id).stream.pour(this.depot.get(id));
				}.bind(this),
				50
			)
		}

		return this.depot.get(id).stream;
	}

	static findAll () {
			// here goes api call
			setTimeout(
				function () {
					this.depot.get().stream.pour(this.depot.get());
				}.bind(this),
				50
			);

		return this.depot.get().stream;
	}

	static isComposite (key) {
		return !!this.define[key];
	}

	isComposed () {
		return Object.keys(this.constructor.define).every(
			function (key) {
				return this[key] && this[key].isComposed && this[key].isComposed();
			}.bind(this)
		)
	}

	compose () {
		Object.keys(this.constructor.define).forEach(
			function (key) {
				var value;

				value = this[key];

				if (this.constructor.isComposite(key) && !value.composed) {
					this[key] = this.constructor.define[key].findOne(value.id).pipe(
						function (composed) {
							this[key] = composed;
							this.composed = this.isComposed();
						}.bind(this)
					)
				}
			}.bind(this)
		);

		this.composed = this.isComposed();
	}

	properties () {
		return Object.keys(this);
	}
}