/**
 * Created by mugen on 6/13/16.
 */
self.addEventListener('message', function (message) {
	self.postMessage(
		self.process[message.data.method](message.data.payload)
	);
}, false);

self.process = function (process, data) {
	return self.processes[process](data);
};

self.processes = {
	get: function () {

	}
};