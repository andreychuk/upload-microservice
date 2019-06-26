# upload-microservice

> [![Build Status](https://travis-ci.org/andreychuk/upload-microservice.svg?branch=master)](https://travis-ci.org/andreychuk/upload-microservice)

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

    LOCAL_FILES_BASEURL - prefix to be used when returning uploaded file URL. Expected to end with "/"

    UPLOAD_MIME_TYPES - list (space-separated) of mime-types that will be considered valid on upload. validation is skipped if list is empty. If variable not defined, no upload MIME-type validation performed.
    example:
    application/pdf application/msword image/jpeg image/png image/gif image/bmp image/webp image/jpg

    JWT_SECRET - Shared secret key to be used for JWT token auth.

## Routes

    POST /s3/upload
    DELETE /s3/remove/:key

    POST /cloudinary/upload
    DELETE /cloudinary/remove/:key

    POST /local/upload
    POST /local/upload-from-url
    DELETE /local/remove/:key
    GET /local/get/:key

    GET /local/get/:key?w_:width,h_:height
    
    GET /local/get/:key?w_:width,h_:height,hc_:crop_height,wc_:crop_width,c_:crop_direction
    GET /local/get/:key?hc_:crop_height,wc_:crop_width,c_:crop_direction
    
    

## Deployment
Microservice is deployable as Docker image, following named volumes are defined:
  * local_data: local data storage with required folders, DB schema and DB file


## Authentication
  Microservice uses JWT-based token authentication (https://jwt.io). Token must be configured using JWT_SECRET environment variable. Tokens should be passed with 'Authorization' request header, using the Bearer schema (https://tools.ietf.org/html/rfc6750)

## Local image storage and getting resized images
  Images uploaded to local storage can be resized or(and) cropped on get, using GET parameters passed to route in following format

  w_:width - :width - positive number, target width in pixels, if given number is lesser than 1 - ratio to original width

  h_:height - :height - positive number, target height in pixels, if given number is lesser than 1 - ratio to original height
 
  hc_:crop_height - :crop_height - positive number, target width in pixels, if given number is lesser than 1 - ratio to original width
  
  wc_:crop_width - :crop_width - positive number, target width in pixels, if given number is lesser than 1 - ratio to original width
  
  c_:crop_direction - :crop_direction - one of the given string: NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast
  
  In case if only width or height given - target image is resized to that dimension keeping aspect ratio.

  In case if both width and height are given - target image is resized to given dimensions without keeping the aspect ratio.
  
  In case if crop_width, crop_height and crop_direction given - target image is croped to given dimensions.
  
  You can also mix height, width, crop_height, crop_width and crop_direction params for cropping and resizing at once.

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.


## TODO

 - [ ] Implement data validation
 - [ ] Re-implement JWT Auth

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
