/**
 * Created by mugen on 6/11/16.
 */
import {Depot} from '../Depot/Depot';
import {Processor} from '../processor/Processor/Processor';

class base {
	constructor () {
		this.processor = Processor;
	}
	
	depot (constructor) {

		if (!this[constructor.name]) {
			this[constructor.name] = new Depot(constructor);
		}

		return this[constructor.name];
	}
}

export let Base = new base();