/**
 * Created by mugen on 6/11/16.
 */
import {Stack} from '../../Stack/Stack';

export class Depot {
	constructor () {
		this.contents = new Stack();
	}

	set (model) {
		this.contents.set(model);
	}

	get (id) {
		return id !== undefined ? this.contents.get(id) : this.contents;
	}
}