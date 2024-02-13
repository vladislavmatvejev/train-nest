# train-nest

## how to start
`docker compose up --build`
api - http://localhost:3000/parcels
angular app - http://localhost:4200 

## endpoints
### GET
List of all parcels (accepts page and limit query params for pagination)

http://localhost:3000/parcels

List of parcels by country and/or description filter (accepts json formated query parameter columns)

http://localhost:3000/parcels?columns={"country":"Estonia","description":"small"}


Get parcel by parcel_id

http://localhost:3000/parcels/:id


Get parcel by sku

http://localhost:3000/parcels/sku/:sku

### POST

Add new parcel

http://localhost:3000/parcels

Request body example
```{
    "parcel": {
        "sku": "12345613",
        "description": "Some description comes here",
        "streetAddress": "Some streetAddress 123",
        "town": "Townsville",
        "country": "Estonia",
        "deliveryDate": "2024-02-02"
    }
}```