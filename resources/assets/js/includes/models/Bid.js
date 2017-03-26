import Model from './Model';

class Bid extends Model {

	constructor() {
		super('services/{id}/bids');
	}

}

export default new Bid;