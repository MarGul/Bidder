import Errors from './Errors';

class Form {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     */
    constructor(data) {
        this.originalData = data;
        this.dateFields = [];

        for (let field in data) {
            this[field] = data[field];
        }

        this.errors = new Errors();
    }

    /**
     * Fields that we want to parse as a date (working with the vuejs datetime picker)
     * 
     * @param  array fields
     */
    asDate(fields) {
        this.dateFields = fields;
        return this;
    }


    /**
     * Fetch all relevant data for the form.
     */
    data() {
        let data = {};

        for (let property in this.originalData) {
            data[property] = this.dateFields.includes(property) && this[property] ? this.parseAsDate(property) : this[property];
        }

        return data;
    }


    /**
     * Reset the form fields.
     */
    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }

        this.errors.clear();
    }

    /**
     * Parse a property of the form as a date.
     */
    parseAsDate(property) {
        let date = new Date(this[property]);
        return `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${date.getDate()}`;
    }

    pad(number) {
        return ( number < 10 ) ? "0" + number : number;
    }
    
}

export default Form;