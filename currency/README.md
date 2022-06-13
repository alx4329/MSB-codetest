# Currency

Thanks for taking part in our code test. This test is intentionally vague and open ended as it is designed for you to show us not only your ability but how you approach and complete tasks assigned to you. There is no right or wrong way to complete this!

## Quick Start

```
# Change into the project directory
cd currency

# Install NPM dependencies
npm install

# Then simply start your app
npm start
```

To make your life easier we have also included the `nodemon` package by default. You can use by running

```
npm run watch
```

## Calling the API

To call the API, we suggest using [postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en). If you haven't used postman before, make sure that you are using `POST` and `raw` with `JSON`.

### Endpoints

`POST http://localhost:8888/api/0.1/`

### Params

| Param    | Type                         | Required | Example                                |
| -------- | ---------------------------- | -------- | -------------------------------------- |
| `base`   | String                       | true     | "USD"                                  |
| `symbol` | String or Array for multiple | true     | Single: "CAD" Multiple: ['CAD', 'AUD'] |
| `amount` | number                       | true     | 45.33                                  |
| `date`   | string                       | false    | "12/3/2013"                            |

If no date is provided the api will return the result for `today`.

### Example calls

The following are some examples to get you started calling the API.

#### Single conversion

This will return the value of 10 USD in EUR using today's conversion rate.

```
{
	"base": "USD",
	"amount": 10,
	"symbol": "EUR"
}
```

This will return the value of 10 CAD in EUR and USD using today's conversion rate.

```
{
	"base": "CAD",
	"amount": 10,
	"symbol": ["USD", "EUR"]
}
```

This will return the value of 10 CAD in USD and EUR using the conversion rate from March 15, 1985

```
{
	"base": "CAD",
	"amount": 10,
	"symbol": ["USD", "EUR"],
	"date": "1985-03-15"
}
```

### Notes

- This API uses the `exchangeratesapi.io` API. If you want more details on their api visit https://exchangeratesapi.io/
