import Model from './Model';

class User extends Model {

	constructor() {
		super('users');
	}

	/**
	 * Instead of having a model just for authenticate.
	 * 
	 * @param  {Object} data [The email and password data]
	 * @return {Primise}     [The send returns a promise that we then return]
	 */
	authenticate(data) {
		return this.send('post', 'auth', data);
	}

}

export default new User;