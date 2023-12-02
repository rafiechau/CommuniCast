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
- react-quill

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
REDIS_KEY_POST=post
REDIS_KEY_MYPOST=mypost

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

## POST ROUTE
### GET /api/posts/

> Get All Post

_Request Header_

```
Bearer Token
```

_Request Body_

```
no need
```

_Response (200)_

```
{
    message: "success retrieved from database"
    "data": [
        {
            "id": 5,
            "title": "[PETUALANGAN BERUJUNG KEMATIAN: TERJEBAK DI GUA]",
            "shortDescription": "Di Utah, Amerika Serikat, ada sebuah gua yang menjadi tempat penjelajahan favorit warga lokal.  Pada 2009, gua itu ditutup permanen setelah seorang penjelajah meninggal karena terbalik dan terjebak di dalam...",
            "des": "<p>efef</p>",
            "image": null,
            "voteCount": 0,
            "createdAt": "2023-12-01T09:57:02.000Z",
            "updatedAt": "2023-12-02T09:23:24.000Z",
            "user": {
                "id": 4,
                "fullName": "Rafie Chau",
                "imagePath": "uploads\\1701423933888.png"
            },
            "hasVoted": false
        }
    ]
}
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

### GET /api/posts/my-post

> Get My Post

_Request Header_

```
Bearer Token
```

_Request Body_

```
no need
```

_Response (200)_

```
{
    message: "success retrieved from database"
    "data": [
        {
            "id": 2,
            "title": "Menunggu capres blunder di pulau pramuka",
            "shortDescription": "dcmlwdcmd",
            "des": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "image": null,
            "voteCount": 0,
            "createdAt": "2023-12-01T09:02:45.000Z",
            "updatedAt": "2023-12-02T09:30:31.000Z",
            "userId": 1,
            "user": {
                "id": 1,
                "fullName": "Ahmad Alif Sofian",
                "imagePath": "uploads/default.jpg"
            },
            "hasVoted": false
        }
    ]
}
```
_Response (404, not found)_

```
 {message:"Data Not Found"}

```

### GET /api/posts/:postId

> Get Detail Post

_Request Header_

```
Bearer Token
```
_Request Body_

```
no need
```

_Request Params_

```
/<postId>
```

_Response (200)_

```
{
    message: "success retrieved from database"
    "data": [
        {
            "id": 2,
            "title": "Menunggu capres blunder di pulau pramuka",
            "shortDescription": "dcmlwdcmd",
            "des": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "image": null,
            "voteCount": 0,
            "createdAt": "2023-12-01T09:02:45.000Z",
            "updatedAt": "2023-12-02T09:30:31.000Z",
            "userId": 1,
            "user": {
                "id": 1,
                "fullName": "Ahmad Alif Sofian",
                "imagePath": "uploads/default.jpg"
            },
            "hasVoted": false
        }
    ]
}
```
_Response (404, not found)_

```
 {message:"Data Not Found"}

```

### GET /api/posts/check-vote/:postId

> Ceck user vote

_Request Header_

```
Bearer Token
```

_Request Params_

```
/<postId>
```
_Request Body_

```
no need
```


_Response (200)_

```
{
    "hasVoted": false
}
```
_Response (404, not found)_

```
 {message:"Data Not Found"}

```

### POST /api/posts/create

> Create Post

_Request Header_

```
Bearer Token
```

_Request Params_

```
no need
```
_Request Body_

```
{
    "image":"image",
    "title":"string"
    "shortDescription":"string"
    "des":"string"
    "voteCount": "integer (default 0)" 
}
```


_Response (200)_

```
{
    "message": "success, Your post has been created",
    "data": {
        "voteCount": 0,
        "id": 8,
        "title": "judul 1",
        "shortDescription": "short description",
        "des": "123",
        "image": "uploads\\1701522607462.png",
        "userId": 1,
        "updatedAt": "2023-12-02T13:10:07.477Z",
        "createdAt": "2023-12-02T13:10:07.477Z"
    }
}
```

_Response (429)_

```
 {
    message:"Karna kamu belum bayar, maka kamu hanya bisa create post setiap 1 jam."
}

```

_Response (400)_

```
{
    "status": "Validation Failed",
    "message": "\"title\" is required"
}

```

### PUT /api/posts/update/<postId>

> Update Post

_Request Header_

```
Bearer Token
```

_Request Params_

```
/<postId>
```
_Request Body_

```
{
    "image":"image",
    "title":"string"
    "shortDescription":"string"
    "des":"string"
    "voteCount": "integer (default 0)" 
}
```


_Response (200)_

```
{
    "message": "success update data"
}
```


_Response (400)_

```
{
    "status": "Validation Failed",
    "message": "\"title\" is required"
}

```

### DELETE /api/posts/delete/<postId>

> Update Post

_Request Header_

```
Bearer Token
```

_Request Params_

```
/<postId>
```
_Request Body_

```
no need
```

_Response (200)_
```
{ 
    message: 'Post successfully deleted.' 
}
```

### POST /api/posts/like/<postId>

> Like Post

_Request Header_

```
Bearer Token
```

_Request Params_

```
/<postId>
```
_Request Body_

```
no need
```

_Response (200)_
```
{
    "updatedPost": {
        "id": 2,
        "title": "Menunggu capres blunder di pulau pramuka",
        "shortDescription": "dcmlwdcmd",
        "des": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "image": null,
        "voteCount": 1,
        "createdAt": "2023-12-01T09:02:45.000Z",
        "updatedAt": "2023-12-02T13:25:21.000Z",
        "user": {
            "id": 1,
            "fullName": "Ahmad Alif Sofian",
            "email": "alif12sofian@gmail.com"
        }
    },
    "message": "Like post."
}
```

### POST /api/posts/unlike/<postId>

> Like Post

_Request Header_

```
Bearer Token
```

_Request Params_

```
/<postId>
```
_Request Body_

```
no need
```

_Response (200)_
```
{
    "updatedPost": {
        "id": 2,
        "title": "Menunggu capres blunder di pulau pramuka",
        "shortDescription": "dcmlwdcmd",
        "des": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "image": null,
        "voteCount": 0,
        "createdAt": "2023-12-01T09:02:45.000Z",
        "updatedAt": "2023-12-02T13:28:04.000Z",
        "user": {
            "id": 1,
            "fullName": "Ahmad Alif Sofian",
            "email": "alif12sofian@gmail.com"
        }
    },
    "message": "Unliked post successfully."
}
```

_Response (400)_

```
{
    "message": "Vote not found"
}

```

