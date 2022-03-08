export class Phone {
  constructor(type, number) {
    this.type = type;
    this.number = number;
  }

  toString() {
    return `${this.type} ${this.number}`;
  }
}

Phone.PRIMARY_PHONE_TYPE = 'PRIMARY';
Phone.HOME_PHONE_TYPE = 'HOME';
Phone.WORK_PHONE_TYPE = 'WORK';
Phone.MOBILE_PHONE_TYPE = 'MOBILE';
