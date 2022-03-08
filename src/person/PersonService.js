import logger from "../utils/logger";
import { Contact } from "./Contact";
import nodemailer from "nodemailer";
import ValidationService from "./ValidationService";

class PersonService {
  persons = [];
  ownerName = process.env.OWNER_NAME;
  ownerEmail = process.env.OWNER_EMAIL;
  emailSubject = process.env.EMAIL_SUBJECT;

  constructor() {
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
    this.greetPerson(person);
  }

  isValidEmail(email) {
    return email && this.EMAIL_PATTERN.test(email);
  }

  validateEmails(person) {
    return person.contacts.some(contact =>
      contact.type === Contact.EMAIL_CONTACT_TYPE &&
      this.isValidEmail(contact.contact)
    );
  }

  greetPerson(person) {
    const recipient = person.contacts.find(contact =>
      contact.type === Contact.EMAIL_CONTACT_TYPE
    );
    try {
      const body = this.prepareEmailBody(person);
      this.sendEmail(recipient, this.ownerEmail, this.emailSubject, body)
        .catch(error => logger.error("Email sending error: ", error));
    } catch (error) {
      logger.error("Email sending error: ", error);
    }
  }

  sendEmail(from, to, subject, body) {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });

    return transporter.sendMail({
      from,
      to,
      subject,
      text: body
    });
  }

  prepareEmailBody(person) {
    return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Greeting</title>
                </head>
                <body>
                    Hello ${person.firstName} ${person.lastName}!
                    You've been added to ${this.ownerName} contacts.
                </body>
            </html>`;
  }
}

export default PersonService;
