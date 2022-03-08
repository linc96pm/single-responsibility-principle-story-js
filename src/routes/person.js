import { Router } from 'express';
import PersonController from '../person/PersonController';

const controller = new PersonController();
const router = Router();

router.get('/contact', controller.findByEmail);
router.post('/contact', controller.storePerson);

export default router;
