/**
 * Created by mugen on 6/13/16.
 */
self.addEventListener('message', function (message) {
	self.postMessage(
		self.process[message.data.process](message.data.payload)
	);
}, false);

self.process = {
	defragment: function (array) {
		var clone;

		clone = [];

		array.forEach(
			function (element, index) {
				if (element) {
					clone.push(index);
				}
			}
		);

		return {
			process: 'defragment',
			type: 'response',
			payload: clone
		}
	}
};