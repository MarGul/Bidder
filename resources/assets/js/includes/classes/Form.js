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
        this.floatFields = [];

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
     * Fields that we want to parse as a float (replacing commas with period)
     * 
     * @param  array fields
     */
    asFloats(fields) {
        this.floatFields = fields;
        return this;
    }


    /**
     * Fetch all relevant data for the form.
     */
    data() {
        let data = {};

        for (let property in this.originalData) {
            let field = this[property];

            //if ( !field ) continue;

            if ( this.dateFields.includes(property) ) {
                field = this.parseAsDate(field);
            }

            if ( this.floatFields.includes(property) ) {
                field = this.parseAsFloat(field);
            }
            
            data[property] = field;
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
     * Parse a property as a float. First replace commas with period.
     */
    parseAsFloat(property) {
        return parseFloat(property.replace(',', '.'));
    }

    /**
     * Parse a property of the form as a date.
     */
    parseAsDate(property) {
        let date = property instanceof Date ? property : new Date(property);

        return `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())}`;
    }

    pad(number) {
        return ( number < 10 ) ? "0" + number : number;
    }
    
}

export default Form;