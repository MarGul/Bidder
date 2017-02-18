class Model {

	constructor(resource) {
		this.resource = resource;
	}

	all() {
		return this.send('get', this.resource);
	}

	find(identifier) {
		return this.send('get', this.resource + '/' + identifier);
	}

	send(requestType, url, data = {}) {
		return new Promise((resolve, reject) => {
			axios[requestType](url, data)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	}
}

export default Model;