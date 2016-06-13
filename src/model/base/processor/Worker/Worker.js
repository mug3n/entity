/**
 * Created by mugen on 6/13/16.
 */
self.addEventListener('message', function (message) {
	self.postMessage(
		self.process[message.data.process](message.data.payload, message.data.id)
	);
}, false);

self.process = {
	defragment: function (array, id) {
		return {
			id: id,
			process: 'defragment',
			type: 'response',
			payload: array.reduce(
				function (previousValue, currentValue, currentIndex) {
					if (currentValue !== null) {
						previousValue[previousValue.length] = currentIndex;
					}

					return previousValue;
				},
				[]
			)
		}
	}
};