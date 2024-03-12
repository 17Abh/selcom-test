steps to run

1. npm install

2. install nodemon if not present, npm i -g nodemon

3. npm run start

login steps

1. create user with API to create user "api/v1/public/user"

2. login with email id and password to get the jwt token "api/v1/public/user/login"

3. use the jwt token in header for books apis

4. Api to add a book "/api/v1/book/add"

example payload for apis

1.  create user : {
    "email":"test@test.com",
    "password":"testtest",
    "userName":"1111"
    }

2.  login user : {
    "email":"test@test.com",
    "password":"testtest",
    }

this will give Authorization token in response

3.  create book : - use Authorization token in header with key "Authorization"
    {
    "title":"test1",
    "author":"ccs",
    "genre":"one",
    "price": 22
    }

Routes:
update book (put):"api/v1/book/:id"
get book (get):"api/v1/book/:id"
delete book (delete):"api/v1/book/:id"
get all books (get) :"api/v1/book/all"
