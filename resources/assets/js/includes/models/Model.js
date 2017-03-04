class Model {

	constructor(resource) {
		this.resource = resource;
	}

	get(params = {}) {
		return this.send('get', this.resource, {params});
	}

	all() {
		return this.send('get', this.resource);
	}

	find(identifier) {
		return this.send('get', this.resource + '/' + identifier);
	}

	create(data) {
		return this.send('post', this.resource, data)
	}

	update(identifier, data) {

	}

	delete(identifier) {
		
	}

	send(requestType, url, config = {}) {
		return new Promise((resolve, reject) => {
			axios[requestType](url, config)
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