# CommuniCast

Express.js project with basic routes:

- Express
- Joi
- Cors
- Bcrypt
- CryptoJS
- jsonwebtoken
- multer
- sequelize
- sequelize-cli
- nodemailer
- dotEnv
- Swagger-ui-express
- swagger-autogen
- mysql2
- stream-chat
- ioRedis
- midTrans

---

## URL

_Server_

```
http://localhost:5000
```

## Run Server

_Server_

```
"npm start" or "node index.js" or "nodemon index.js"

```

---

## ENV FILE

change .env.example to .env

```
NODE_ENV=development
APP_PORT=5000

MAX_ATTEMPTS_LOGIN=3
ATTEMPTS_EXPIRE=2*60

SECRET_KEY=rahasia
SECRET_KEY_VERIFY_EMAIL=rasda
SECRET_KEY_FOR_FORGET_PASSWORD=sangatrahasia
CRYPTOJS_SECRET=rahasiabanget

STREAM_KEY=stream chat api key from etStream.io
STREAM_SECRET=stream chat secret key from etStream.io

MY_EMAIL=email
EMAIL_PASSWORD="password"

CLIENT_URL=http://localhost:3000/
CLIENT_HOST=http://localhost:3000
SERVER_HOST=http://localhost:5000/

```

---

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - Unathourize)_

```
"Unathourize"
```

_Response (403 - forbidden)_

```
"Forbidden"
```

---

# RESTful endpoints

## AUTH ROUTE

### POST /api/user/login

> login

_Request Header_

```
not needed
```

_Request Body_

```
{
    "email":email,
    "password":password
}
```

_Response (200)_

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImhyIiwiaWF0IjoxNzAwMjA0ODcxfQ.3MSK5zuJFsfcTyKd1ZJPfpRt2Wm9GP1vIx25w6XfcdQ",
    "message": "Login success"
}
```

_response(400,bad request)_

```
`hit maximum Login Attempt, try again in ${attemptsExpire} seconds`

```

_response(400,bad request)_

```
"invalid email or password"

```

---

---

### POST /api/user/register

> register

_Request Header_

```
not needed
```

_Request Body_

```
{
    "fullName":name,
    "email":email,
    "password":password,
}
```

_Response (200)_

```
{
    "data": {
        "id": 3,
        "email": "hr3@user.com",
        "password": "$2b$10$xD1Hw1uCDPBIOgC59WClGOdFJqifcvVrXzafXPkiBPs9./3hFm7Pu",
        "fullName": "test aja",
        "role": "standard",
        "updatedAt": "2023-11-17T07:10:03.159Z",
        "createdAt": "2023-11-17T07:10:03.159Z",
        "isEmailAuth": false
    },
    "message": "success register with name:"test aja""
}
```

_Response (409)_

```
"user with that email already existed"
```

---

### POST /api/user/forgotPassword

> forgot password

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email":email
}
```

_Response (200)_

```
{
 message: "Check your email for forgot password",
}
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### POST /api/user/resetPassword/

> set password with new password

_Request Params_

```
not needed
```

_Request Header_

```
bearer token
```

_Request Body_

```
{
    "token":"token",
    "new_password":"string"
}
```

_Response (200)_

```
{
    message:
          "success reset password",
}
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### POST /api/user/verifyEmail

> Verify email

_Request Header_

```
Bearer Token
```

_Request Body_

```
{email:email}
```

_Response (200)_

```
{ message: "OTP sent to email" }
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

### PATCH /api/user/checkOtpVerifyEmail

> set Verify email true

_Request Header_

```
Bearer Token
```

_Request Body_

```
{otp:otp,token:token}
```

_Response (200)_

```
{ message: "Success Verify" }
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

_Response (404, forbidden)_

```
 {message:"OTP invalid"}

```

---

### GET /api/user/profile

> get profile

_Request Header_

```
Bearer Token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": {
        "id": 2,
        "fullName": "abang HR",
        "email": "hr123@user.com",
        "role": "standard",
        "createdAt": "2023-11-17T09:09:51.000Z",
        "updatedAt": "2023-11-17T09:09:51.000Z"
    },
    "message": "success"
}
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### PUT /api/user/edit/photoProfile

> edit photo Profile

_Request Header_

```
Bearer Token
```

_Request Body_

```
{image:"from form data"}
```

_Response (200)_

```
{
    "data": {
        "createdAt": '2023-11-30T07:01:55.000Z';
        "email": 'alif12sofian@gmail.com';
        "fullName": 'Ahmad Alif Sofian';
        "id": 1;
        "imagePath": 'uploads\\1701332838719.png';
        "password": '$2b$10$aS/p8Uw25ZN4snEh99YaheguJImKW3rCySSfimE1IQbzL7ebJGvnW';
        "role": 'pro';
        "updatedAt": '2023-11-30T08:27:18.733Z';
    },
    "message": "success edit photo profile"
}
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### PUT /api/user/edit/profile

> edit Profile

_Request Header_

```
Bearer Token
```

_Request Body_

```
{
    "fullname":"tdsatda",
    "password":"dsahdsada"
}
```

_Response (200)_

```
{
    "data": {
        "createdAt": '2023-11-30T07:01:55.000Z';
        "email": 'alif12sofian@gmail.com';
        "fullName": 'Ahmad Alif Sofian';
        "id": 1;
        "imagePath": 'uploads\\1701332838719.png';
        "password": '$2b$10$aS/p8Uw25ZN4snEh99YaheguJImKW3rCySSfimE1IQbzL7ebJGvnW';
        "role": 'pro';
        "updatedAt": '2023-11-30T08:27:18.733Z';
    },
    "message": "success edit photo profile"
}
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### DELETE /api/user/delete/profile

> delete user

_Request Header_

```
Bearer Token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "message": "deleted user"
}
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### GET /api/user/logout

> user Logout

_Request Header_

```
Bearer Token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{ message: "logout" }
```

---

## MESSAGE ROUTE

### POST /api/chat/token

> get stream chat token

_Request Header_

```
Bearer Token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImhyIiwiaWF0IjoxNzAwMjA0ODcxfQ.3MSK5zuJFsfcTyKd1ZJPfpRt2Wm9GP1vIx25w6XfcdQ",
}
```

---

### POST /api/chat/createChannel

> login

_Request Header_

```
Bearer Token
```

_Request Body_

```
{
    "userId":"1"
}
```

_Response (200)_

```
{ message: "Created channel" }
```

---

### GET /api/chat/userAvailable

> login

_Request Header_

```
Bearer Token
```

_Request Body_

```
{
    "userId":"1"
}
```

_Response (200)_

```
{
    "data": [
        {
            "id": 2,
            "fullName": "pro",
            "email": "pro@user.com",
            "role": "pro",
            "imagePath": "uploads/default.jpg",
            "createdAt": "2023-11-30T04:37:35.000Z",
            "updatedAt": "2023-11-30T04:37:35.000Z"
        },
        {
            "id": 3,
            "fullName": "standart",
            "email": "standart@user.com",
            "role": "standard",
            "imagePath": "uploads/default.jpg",
            "createdAt": "2023-11-30T04:37:35.000Z",
            "updatedAt": "2023-11-30T04:37:35.000Z"
        }
    ]
}
```

---
