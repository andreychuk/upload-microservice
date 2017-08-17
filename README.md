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
    
## Routes

    POST /s3/upload
    DELETE /s3/remove/:key 

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## TODO

- [ ] add upload to [cloudinary](http://cloudinary.com)

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
