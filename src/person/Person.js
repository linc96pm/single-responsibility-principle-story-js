import { Address } from "./Address";
import { Phone } from "./Phone";
import { Contact } from "./Contact";

export class Person {
  constructor(firstName, lastName, birthday, addresses, phones, contacts) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.addresses = (addresses || []).map(address => new Address(
      address.type,
      address.address1,
      address.address2,
      address.zip,
      address.country
    ));
    this.phones = (phones || []).map(phone => new Phone(
      phone.type,
      phone.number
    ));
    this.contacts = (contacts || []).map(contact => new Contact(
      contact.type,
      contact.contact
    ));
  }
}
