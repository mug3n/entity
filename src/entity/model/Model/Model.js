/**
 * Created by mugen on 6/11/16.
 */
import {Base} from '../../model/base/Base/Base';
import {Stream} from '../../stream/Stream/Stream';

export class Model {
	constructor (data) {
		this.stream    = new Stream();
		this.composing = new Stream();

		Object.defineProperties(
			this,
			Object.keys(data).reduce(
				function (previous, current) {
					let privateValue;

					previous[current] = {
						set: function (value) {
							privateValue = value;
							this.stream.carry(this);
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
					this.depot.get(id).composed(
						function (composed) {
							this.depot.get(id).stream.carry(composed);
						}.bind(this)
					);
				}.bind(this)
			)
		} else {
			// here goes api call
			setTimeout(
				function () {
					this.depot.get(id).composed(
						function (composed) {
							this.depot.get(id).stream.carry(composed);
						}.bind(this)
					);
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
				this.depot.get().stream.carry(this.depot.get());
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
		);
	}

	composed (handler) {
		if (handler) {
			if (this.isComposed()) {
				//console.count('Model already composed.');
				this.composing.unlink().pipe(handler).carry(this);
			} else {
				this.composing.pipe(handler);
			}
		} else {
			console.count('Model composed.');

			this.composing.carry(this);
			this.composed = function (handler) {
				//console.count('Model already composed.');
				if (handler) {
					this.composing.unlink().pipe(handler).carry(this).unlink();
				}
			}.bind(this);
		}

		return this;
	}

	compose () {
		Object.keys(this.constructor.define).forEach(
			function (key) {
				this.constructor.define[key].findOne(this[key].id).pipe(
					function (model) {
						this[key] = model;
						if (this.isComposed()) {
							this.composed();
						}
					}.bind(this)
				)
			}.bind(this)
		);
	}

	properties () {
		return Object.keys(this);
	}
}