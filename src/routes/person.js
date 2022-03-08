import { Router } from 'express';
import PersonController from '../person/PersonController';
import PersonService from '../person/PersonService';

const personService = new PersonService();
const controller = new PersonController(personService);
const router = Router();

router.get('/contact', controller.findByEmail);
router.post('/contact', controller.storePerson);

export default router;
