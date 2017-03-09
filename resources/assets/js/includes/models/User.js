import Model from './Model';

class User extends Model {

	constructor() {
		super('users');
	}

	authenticate(data) {
		return this.send('post', 'auth', data);
	}

}

export default new User;