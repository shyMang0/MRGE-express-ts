# REST API Simple Notes Application

This is a basic example of a Note Taking Application providing a
REST API.

The application uses `Express`, `Typescript` and `Sequelize`.

The Data Storage used is `SQLite`.

Validates inputs using `Zod`.

Can utilize `.env` file to configure the application.

No Database Migrations needed, Sqlite Tables are built automatically.


## Clone the repository

    git clone https://github.com/shyMang0/express-ts-OTA.git

## Install
    cd express-ts-OTA
    
    npm install

## Run the app

    npm run start

## Changing the Port (Optional)
   default port is 3000
   
   update/create a .env 
   `PORT=3000`

# REST API

The REST API to the example app is described below.

## Get list of Notes

### Request

`GET /notes`

    curl -i -H 'Accept: application/json' http://localhost:3000/notes

### Response

    [{"id":"118e4","title":"FooTitle","body":"FooBody","created_at":"2024-01-23T02:27:02.699Z","updated_at":"2024-01-23T02:27:02.699Z"}]

## Create a new Note

### Request

`POST /notes`

dataBody `{ title : string, body : string }`

    curl -i -X POST -H "Accept: application/json" -d "title=FooTitle&body=FooBody" http://localhost:3000/notes

### Response

    {"success":true,"message":"new note created","data":{"title":"FooTitle","body":"FooBody","id":"7b4bd","updated_at":"2024-01-23T04:05:10.963Z","created_at":"2024-01-23T04:05:10.963Z"}}

## Get a specific Note

### Request

`GET /notes/:id`

    curl -i -H 'Accept: application/json' http://localhost:3000/notes/5a09a

### Response

    {"id":"7b4bd","title":"FooTitle","body":"FooBody","created_at":"2024-01-23T04:05:10.963Z","updated_at":"2024-01-23T04:05:10.963Z"}

## Update a Note

### Request

`PUT /notes/:id`

dataBody `{ title : string, body : string }`

    curl -i -X PUT -H "Accept: application/json" -d "title=UpdatedTitle&body=UpdatedBody" http://localhost:3000/notes/118e4

### Response

    {"success":true,"message":"row updated","data":{"id":"7b4bd","title":"UpdatedTitle","body":"UpdatedBody","created_at":"2024-01-23T04:05:10.963Z","updated_at":"2024-01-23T04:08:35.115Z"}}

## Delete a Note

### Request

`DELETE /notes/:id`

    curl -i -H 'Accept: application/json' -X DELETE http://localhost:3000/notes/5a09a

### Response

    {"success":true,"message":"Note Deleted"}

