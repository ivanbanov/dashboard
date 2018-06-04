# API Endpoints

## `/device`
##### ENDPOINT
`/device`

##### METHOD
`GET`

##### RESPONSE
A JSON object. The `data` key refers to an array containing each of the device's readings. Each reading has the following keys: `name`, `unit`, `value`, `timestamp`, and `active`.

## `/device/${readingName}`
##### ENDPOINT
`/device/${readingName}?active=${stateValue}`

##### METHOD
`PATCH`

#### URL PARAMS
`active` - accepts true or false. `PATCH` here to toggle the `active` status for a specific reading.

##### RESPONSE
Successful requests will return a `200`. Unsuccessful requests will return a `400`

##### NOTES
This endpoint is designed to imitate a "real world" async endpoint. The response times will vary, even on localhost, and occasionally your request will simply fail.