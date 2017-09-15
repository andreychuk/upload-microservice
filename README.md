# upload-microservice

>

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/upload-microservice; npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Environment Variables


    DEBUG - All in app logs goes to 'app*'.
    PORT - What port server is listening.

    NODE_ENV - production

    AWS_ACCESS_KEY_ID - AWS access key id
    AWS_SECRET_ACCESS_KEY - AWS secret access key
    AWS_REGION - AWS region
    AWS_BUCKET_NAME - AWS bucket name

    CLD_CLOUD_NAME - Cloudinary Cloud name
    CLD_API_KEY - Cloudinary API key
    CLD_API_SECRET - Cloudinary API secret

    LOCAL_DB_STORAGE - Local DB filename
    LOCAL_FILES_PATH - Local path to store files

## Routes

    POST /s3/upload
    DELETE /s3/remove/:key

    POST /cloudinary/upload
    DELETE /cloudinary/remove/:key

    POST /local/upload
    DELETE /local/remove/:key
    GET /local/get/:key

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## TODO

- [ ] add upload to [cloudinary](http://cloudinary.com)
- [ ] add upload to local storage

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
