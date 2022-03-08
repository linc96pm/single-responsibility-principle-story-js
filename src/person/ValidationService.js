import { Contact } from "./Contact";
import ValidationException from "./ValidationException";

class ValidationService {
  EMAIL_PATTERN = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

  validatePerson(person) {
    person.contacts.forEach(contact => this.validateContact(contact));
    const oneValidFound = person.contacts.some(contact =>
      contact.type === Contact.EMAIL_CONTACT_TYPE &&
      this.isValidEmail(contact.contact)
    );
    if (!oneValidFound) {
      throw new ValidationException('Email is required', 'at least one contact email is required');
    }
  }

  isValidEmail(email) {
    return email && this.EMAIL_PATTERN.test(email);
  }

  validateEmail(email) {
    if (!this.isValidEmail(email)) {
      throw new ValidationException('Email is required', 'email field is empty or invalid');
    }
  }

  validateContact(contact) {
    if (contact.type === Contact.EMAIL_CONTACT_TYPE) {
      this.validateEmail(contact.contact);
    }
  }
}

export default ValidationService;
