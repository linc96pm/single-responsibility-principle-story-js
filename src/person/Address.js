export class Address {
	constructor(type, address1, address2, zip, country) {
		this.type = type;
		this.address1 = address1;
		this.address2 = address2;
		this.zip = zip;
		this.country = country;
	}

	toString() {
		return `${this.type} ${this.address1} ${this.address2} ${this.zip} ${this.country}`;
	}
}

Address.HOME_ADDRESS_TYPE = 'HOME';
Address.WORK_ADDRESS_TYPE = 'WORK';
