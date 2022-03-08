# Single Responsibility Principle Refactoring Story
**To read the story**: https://refactoringstories.com/file-view/https:%2F%2Fgit.epam.com%2FRefactoring-Stories%2Fsingle-responsibility-principle-story-js

**To code yourself**: https://git.epam.com/Refactoring-Stories/single-responsibility-principle-story-js

**Estimated reading time**: 20 min

## Story Outline
Welcome to refactoring story about Single Responsibility Principle (SRP) for SOLID training course.
This story is about proper decomposition of classes and methods to fit Single Responsibility Principle.
In this story you will see example of web service application that is able to store and manage information
about persons and their contacts. Also you will see application evolution during refactoring 
and improvements steps.

### Contacts Book
Contacts Book is a REST web service which exposes personal data as JSON.
Project is built using NodeJs and Express framework, so it utilizes simplicity of
coding, deployment, and data exposing using NodeJs technologies stack. 

Class [Person](/src/person/Person.js) keeps persons 
information about name, birthday, living address and various contacts like phone and IM.
[Person](/src/person/Person.js) is exposed as REST resource 
to store and query by personal data using person's email as a primary key.

##### Run application
To run application you have to install NodeJs from
https://nodejs.org
Run following command and check output to ensure that nodejs installed properly
```
node -v
```

After that you have to switch to your project directory and execute following command:
```
cd single-responsibility-principle-story-js
npm install
```
Then to run application
```
npm start
```
Output:
```
> nodemon --exec babel-node src/index.js

[nodemon] 1.19.3
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node src/index.js`
Example app listening on port 3000!
```

##### Store new contact
As you see application is listening on port 3000.
To add new contact you should POST request to:
```
http://localhost:3000/person/contact
```
With the following JSON in the body
```
{
    "firstName": "John",
    "lastName": "Doe",
    "birthday": "2000-01-01",
    "contacts" : [{ "type":"EMAIL", "contact":"jdoe@email.dog"}]
}
```

##### Query contact by email
You might query contact by issuing GET request like:
```
http://localhost:3000/person/contact?email=jdoe@email.dog
```
Which might response with following JSON:
```
{
    "firstName": "John",
    "lastName": "Doe",
    "birthday": "2000-01-01",
    "addresses": [],
    "phones": [],
    "contacts": [
        {
            "type": "EMAIL",
            "contact": "jdoe@email.dog"
        }
    ]
}
```
##### Application evolution and extensions planning
At the first glance application is able to fulfill it's goals. But it might be not well
suitable for further evolution and extensions because of many violations.
One of most annoying here is Single Responsibility Principle violation.
Improving only that aspect alone we might dramatically improve application structure
and "fix" other violations.
