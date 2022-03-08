import { Router } from 'express';
import PersonController from '../person/PersonController';
import PersonService from '../person/PersonService';
import EmailService from '../person/EmailService';

const emailService = new EmailService();
const personService = new PersonService(emailService);
const controller = new PersonController(personService);
const router = Router();

router.get('/contact', controller.findByEmail);
router.post('/contact', controller.storePerson);

export default router;
