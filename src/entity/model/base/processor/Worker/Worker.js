import {Entity} from '../../../../Entity/Entity';
import {Extended} from '../../../../../model/extended/Extended/Extended';
import {ExtendedLevel2} from '../../../../../model/extended/ExtendedLevel2/ExtendedLevel2';
import {Stack} from '../../../../../entity/model/Stack/Stack';
import {Stream} from '../../../../stream/Stream/Stream';
import {data} from '../../../../../../data.json';

const Interface = {
	Extended: Extended,
	ExtendedLevel2: ExtendedLevel2
};


// Just for dependencies
new Extended(
	{
		id: 0,
		extended: 'level1-0'
	}
);

new Extended(
	{
		id: 1,
		extended: 'level1-1'
	}
);

//

function request (url, method) {
	var stream = new Stream(),
		xhr    = new XMLHttpRequest();

	xhr.overrideMimeType("application/json");
	xhr.open(method, url, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == "200") {
			stream.carry(xhr.responseText);
		}
	};
	xhr.send(null);

	return stream;
}

function serialize (data) {
	let serialized;

	let serializer = function (model) {
		delete model.composing;
		delete model.stream;

		return Object.getOwnPropertyNames(model).reduce(
			function (lastValue, currentValue) {
				if (model.constructor.isComposite(currentValue)) {
					lastValue[currentValue] = serializer(model[currentValue]);
				} else {
					lastValue[currentValue] = model[currentValue];
				}

				return lastValue;
			},
			{}
		);
	};

	if (data instanceof Stack) {
		serialized = data.toArray(
			function (model) {
				return serializer(model);
			}
		);
	} else {
		serialized = serializer(model);
	}
	return serialized;
}


let Input = new Stream();

Input.pipe(
	function (message) {
		Interface[message.data.resource][message.data.action.name](message.data.action.data).pipe(
			function (data) {
				Output.carry(data);
			}
		)
	}
);

let Output = new Stream();

Output.pipe(
	function (message) {
		self.postMessage(JSON.stringify(serialize(message)));
	}
);

//test data
request('../data.json', 'GET').pipe(
	function (data) {
		let consolidator = new Stream('Consolidated');
		console.time('Composed 1000 models in');

		data = JSON.parse(data);
		data = data.slice(0, 1);
		//data = data.slice().concat(data);
		consolidator.pipe(
			function () {
				data = new Stack(data).composed(
					function (stack) {
						console.timeEnd('Composed 1000 models in');
						console.log(stack, 'Done!');
					}
				);
			}
		);
		data = data.map(
			function (object) {
				var instance;

				instance = new ExtendedLevel2(object).composed(
					consolidator
				);

				return instance;
			}
		);
	}
);

self.addEventListener('message', function (message) {
	Input.carry(message)
}, false);