import { StatusCodes } from 'http-status-codes';
import { Contact } from "./Contact";
import logger from "../utils/logger";
import nodemailer from "nodemailer";
import { Person } from "./Person";

class PersonController {
  EMAIL_PATTERN = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
  persons = [];
  ownerName = process.env.OWNER_NAME;
  ownerEmail = process.env.OWNER_EMAIL;
  emailSubject = process.env.EMAIL_SUBJECT;

  findByEmail = (req, res) => {
    const email = req.query['email'];
    if (this.isValidEmail(email)) {
      res.status(StatusCodes.OK).json(this.findPersonByEmail(email));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Email is required',
        details: 'email field is empty or invalid'
      })
    }
  };

  storePerson = (req, res) => {
    const person = new Person(
      req.body.firstName,
      req.body.lastName,
      req.body.birthday,
      req.body.addresses,
      req.body.phones,
      req.body.contacts
    );
    if (this.validateEmails(person)) {
      this.persons.push(person);
      this.greetPerson(person);
      res.sendStatus(StatusCodes.OK);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Email is required',
        details: 'contact has no any valid emails'
      })
    }
  };

  isValidEmail(email) {
    return email && this.EMAIL_PATTERN.test(email);
  }

  validateEmails(person) {
    return person.contacts.some(contact =>
      contact.type === Contact.EMAIL_CONTACT_TYPE &&
      this.isValidEmail(contact.contact)
    );
  }

  findPersonByEmail(email) {
    return this.persons.find(
      person => person.contacts.some(contact =>
        contact.type === Contact.EMAIL_CONTACT_TYPE &&
        contact.contact === email
      )
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

export default PersonController;
