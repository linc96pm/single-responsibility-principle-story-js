import logger from "../utils/logger";
import nodemailer from "nodemailer";
import { Contact } from "./Contact";

class EmailService {
  host = process.env.MAIL_HOST;
  port = process.env.MAIL_PORT;
  user = process.env.MAIL_USERNAME;
  pass = process.env.MAIL_PASSWORD;
  ownerName = process.env.OWNER_NAME || 'John Doe';
  ownerEmail = process.env.OWNER_EMAIL || 'jdoe@gmail.com';
  emailSubject = process.env.EMAIL_SUBJECT || 'Your email contact was added to contacts';

  sendGreetingEmail(person) {
    try {
      const recipient = this._extractEmail(person);
      const body = this._prepareEmailBody(person);
      this._sendEmail(recipient, this.ownerEmail, this.emailSubject, body)
        .catch(error => logger.error("Email sending error: ", error));
    } catch (error) {
      logger.error("Email sending error: ", error);
    }
  }

  _extractEmail(person) {
    return person.contacts.find(contact =>
      contact.type === Contact.EMAIL_CONTACT_TYPE
    );
  }

  _sendEmail(from, to, subject, body) {
    const transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: false,
      auth: {
        user: this.user,
        pass: this.pass
      }
    });

    return transporter.sendMail({
      from,
      to,
      subject,
      text: body
    });
  }

  _prepareEmailBody(person) {
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

export default EmailService;
