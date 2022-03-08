import { Contact } from "./Contact";
import ValidationService from "./ValidationService";

class PersonService {
  persons = [];

  constructor(emailService) {
    this.emailService = emailService;
    this.validationService = new ValidationService();
  }

  findPersonByEmail(email) {
    this.validationService.validateEmail(email);
    return this.persons.find(
      person => person.contacts.some(contact =>
        contact.type === Contact.EMAIL_CONTACT_TYPE &&
        contact.contact === email
      )
    );
  }

  store(person) {
    this.validationService.validatePerson(person);
    this.persons.push(person);
    this.emailService.sendGreetingEmail(person);
  }
}

export default PersonService;
