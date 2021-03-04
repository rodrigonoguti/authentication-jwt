# authentication-jwt

A simple (and secure) JWT authentication demonstration. It was coded using:
- NodeJS
- Express
- SQLite
- Typescript

Steps to run:
- Clone the repository
- Generate a private and public key:<br>
```openssl genrsa -out private-key.pem 2048```<br>
```openssl rsa -in private-key.pem -pubout -out public-key.pem```
- Create an ```.env``` file with your ```JWT_PRIVATE_KEY``` and ```JWT_PUBLIC_KEY``` constants (in root directory). Ps: remember to replace "new lines" characters by ```\n```.
- In the root directory, run:
- ```yarn install```
- ```yarn dev```
- Available routes are:<br>
```/users```: Create a new user. POST method sending ```email``` and ```password``` in JSON format (body).<br>
```/authenticate```: Authenticate and generate a JWT token. POST method sending ```email``` and ```password``` in JSON format (body).<br>
```/users```: (need authentication) List all users. GET method with ```"Authorization: Bearer {token}"``` header.
