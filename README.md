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
const language = 'english' or default 'local'
const holidayName = checkHoliday(date, countryCode, language) // Returns: "Juldagen"
const invalidHolidayDate = checkHoliday('2024-12-03', 'se') // Returns empty string: ""

const year = 2024
const holidays = getHolidays(year, countryCode, language) // Returns the following object:
{
  "New Year's Day": '2024-01-01',
  'Christmas Eve': '2024-12-24',
  'Christmas Day': '2024-12-25',
  'Second Day of Christmas': '2024-12-26',
  "New Year's Eve": '2024-12-31',
  "International Workers' Day": '2024-05-01',
  Epiphany: '2024-01-06',
  'National Day of Sweden': '2024-06-06',
  'Good Friday': '2024-03-29',
  'Easter Sunday': '2024-03-31',
  'Easter Monday': '2024-04-01',
  'Ascension Day': '2024-05-09',
  Pentecost: '2024-05-19',
  "All Saints' Day": '2024-11-02',
  "Midsummer's Day": '2024-06-22'
}
```
### Functions
```typescript
checkHoliday(date: string | Date, country: "se" | "dk" | "no", language: 'english' | 'local'): string
getHolidays(year: number, country: "se" | "dk" | "no", language: 'english' | 'local'): string[]
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
