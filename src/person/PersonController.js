import { StatusCodes } from 'http-status-codes';
import { Person } from './Person';

class PersonController {
  constructor(personService) {
    this.personService = personService;
  }

  findByEmail = (req, res) => {
    const email = req.query['email'];
    try {
      res.status(StatusCodes.OK).json(this.personService.findPersonByEmail(email));
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
        details: error.description
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
    try {
      this.personService.store(person);
      res.sendStatus(StatusCodes.OK);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
        details: error.description
      })
    }
  };
}

export default PersonController;
