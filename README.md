# Nordic Holidays Javascript Library

This library provides functions to check and retrieve public holidays for Sweden (SE), Denmark (DK), and Norway (NO). It supports both fixed and moveable holidays, including those based on Easter.

## Features

- **Check if a given date is a public holiday** for Sweden, Denmark, or Norway.
- **Retrieve all holidays for a given year** for any of the supported countries.

## Installation

To use this library in your project, first install it via npm:

```sh
npm install nordic-holidays
```
https://www.npmjs.com/package/nordic-holidays

## Usage
```javascript
const { checkHoliday, getHolidays } = require("nordic-holidays");
or
import { checkHoliday, getHolidays } from "nordic-holidays";

const date = '2024-12-25' or new Date('2024-12-25')
const countryCode = 'se' or 'dk' or 'no'
const holidayName = checkHoliday(date, countryCode) // Returns: "Juldagen"
const invalidHolidayDate = checkHoliday('2024-12-03', 'se') // Returns empty string: ""

const year = 2024
const holidays = getHolidays(year, countryCode) // Returns the following array:
[
  "Holiday name: day-month"
  "New Year's Day: 01-01",
  'Christmas Eve: 24-12',
  'Christmas Day: 25-12',
  'Second Day of Christmas: 26-12',
  "New Year's Eve: 31-12",
  "International Workers' Day: 01-05",
  'Epiphany: 06-01',
  'National Day of Sweden: 06-06',
  'Good Friday: 29-03',
  'Easter Sunday: 31-03',
  'Easter Monday: 01-04',
  'Ascension Day: 09-05',
  'Pentecost: 19-05',
  "All Saints' Day: 02-11",
  "Midsummer's Day: 22-06"
]
```
### Functions
```typescript
checkHoliday(date: string | Date, country: CountryCode): string
getHolidays(year: number, country: CountryCode): string[]
```

## Supported Holidays

### General Holidays (Applicable to All Countries)

- **New Year's Day**
- **Christmas Eve**
- **Christmas Day**
- **Second Day of Christmas**
- **New Year's Eve**
- **Good Friday**
- **Easter Sunday**
- **Easter Monday**
- **Ascension Day**
- **Pentecost**
- **All Saints' Day**

### Sweden (SE) Specific Holidays

- **International Workers' Day**
- **Epiphany**
- **National Day of Sweden**
- **Midsummer's Day**

### Denmark (DK) Specific Holidays

- **Maundy Thursday**
- **General Prayer Day**:

### Norway (NO) Specific Holidays

- **International Workers' Day**
- **Constitution Day**
- **Whit Monday**
