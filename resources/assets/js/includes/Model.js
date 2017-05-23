class Model {

	constructor(resource) {
		this.resource = resource;
		this.instance = null;
		this.url = null;
	}

	new(config = {baseURL: 'http://bidder.dev'}) {
		this.instance = axios.create(config);
		return this;
	}

	setId(id, match = '{id}') {
		this.resource = this.resource.replace(match, id);
		return this;
	}

	setResource(resource) {
		this.resource = resource;
		return this;
	}

	setUrl(url) {
		this.url = url;
		return this;
	}

	get(params = {}) {
		return this.send('get', this.resource, {params});
	}

	post(data = {}) {
		return this.send('post', this.resource, data);
	}

	patch(data = {}) {
		return this.send('patch', this.resource, data);
	}

	put(data = {}) {
		return this.send('put', this.resource, data);
	}

	find(identifier) {
		return this.send('get', this.resource + '/' + identifier);
	}

	create(data) {
		return this.send('post', this.resource, data)
	}

	update(identifier, data, type = 'patch') {
		this.setId(identifier);
		return this.send(type, this.resource, data);
	}

	delete(identifier) {
		
	}

	send(requestType, url, config = {}) {
		return new Promise((resolve, reject) => {
			let instance = this.instance || axios;
			let path = this.url || url;

			instance[requestType](path, config)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});
			// If a new instance or a custom URL has been used, reset that.
			this.instance = null;
			this.url = null;
		});
	}
}

export default Model;