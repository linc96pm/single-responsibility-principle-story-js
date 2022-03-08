export class Contact {
  constructor(type, contact) {
    this.type = type;
    this.contact = contact;
  }

  toString() {
    return `${this.type} ${this.contact}`;
  }
}

Contact.EMAIL_CONTACT_TYPE = 'EMAIL';
Contact.SKYPE_CONTACT_TYPE = 'SKYPE';
Contact.FACEBOOK_CONTACT_TYPE = 'FACEBOOK';
Contact.LINKEDIN_CONTACT_TYPE = 'LINKEDIN';
