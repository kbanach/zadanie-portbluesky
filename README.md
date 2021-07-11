# Port Blue Sky - coding challenge

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API endpoints

App is running by default on port 3000: http://localhost:3000

To fetch payment dates:

- http://localhost:3000/api/v1/payment/2021-07-10?format=csv to get CSV file response
- http://localhost:3000/api/v1/payment/2021-07-10 to get JSON response

## Coding challenge description

> ### The Burroughs Test (Backend)
>
> Create a small API to help a small ﬁctional company calculate the dates on which they should pay their sales staff. Company payroll is handled like so:
>
> - Sales staff are paid a regular ﬁxed base salary each month, plus a regular monthly bonus.
>
> - Base salaries are paid on the last day of each month unless that day is a Saturday or Sunday (a weekend), in which case they are paid on the Friday before the weekend
>
> - On the 15th of each month, bonuses are paid for the previous month, unless that day is a weekend, in which case they are paid on the ﬁrst Wednesday after the 15th.
>
> Your API should accept a date as a parameter, and return the payment dates for the following 12 months, including the supplied date. Results should be returned in CSV format.
>
> You can assume that your API will be consumed by a browser-based company intranet, written in a front-end framework such as React.
