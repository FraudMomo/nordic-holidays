const { checkHoliday, getHolidays } = require('../dist/nordic-holidays.js');
const axios = require("axios");

const yearsToTest = Array.from({ length: 10 }, (_, i) => 2020 + i);

const fetchHolidays = async (year, country) => {
  let holidays = await axios.get(
    "https://date.nager.at/api/v3/PublicHolidays/" + year + "/" + country
  );
  return holidays.data;
};

describe("Sweden", function () {
  this.timeout(10000); // Increase timeout to 10 seconds (10000ms)
  it("should pass if checkHoliday returns true for each holiday from the public API", async function () {
    let failedYears = [];
    let passedYears = [];

    for (let year of yearsToTest) {
      let fail = false;
      let holidays = await fetchHolidays(year, "SE");

      holidays.forEach((holiday) => {
        /* Not a public holiday in Sweden */
        if (holiday.localName === "Midsommarafton") {
          return;
        }

        /* Check date */
        if (!checkHoliday(new Date(holiday.date), "se")) {
          /* Failed */
          fail = true;
            console.log(
                "\x1b[31m%s\x1b[0m",
                "Failed: ",
                holiday.date,
                holiday.localName
            );
        }
      });

      if (fail) {
        failedYears.push(year);
      } else {
        passedYears.push(year);
      }
    }

    if(failedYears.length > 0) {
      console.log("\x1b[32m%s\x1b[0m", "Passed Years: ", passedYears);
      console.log("\x1b[31m%s\x1b[0m", "Failed Years: ", failedYears);
      throw new Error("One or more tests failed, see details above");
    }
  });
});

describe("Norway", function () {
  this.timeout(10000); // Increase timeout to 10 seconds (10000ms)
  it("should pass if checkHoliday returns true for each holiday from the public API", async function () {
    let failedYears = [];
    let passedYears = [];

    for (let year of yearsToTest) {
      let fail = false;
      let holidays = await fetchHolidays(year, "NO");

      holidays.forEach((holiday) => {
        /* Check date */
        if (!checkHoliday(new Date(holiday.date), "no")) {
          /* Failed */
          fail = true;
            console.log(
                "\x1b[31m%s\x1b[0m",
                "Failed: ",
                holiday.date,
                holiday.localName
            );
        }
      });

      if (fail) {
        failedYears.push(year);
      } else {
        passedYears.push(year);
      }
    }

    if(failedYears.length > 0) {
      console.log("\x1b[32m%s\x1b[0m", "Passed Years: ", passedYears);
      console.log("\x1b[31m%s\x1b[0m", "Failed Years: ", failedYears);
      throw new Error("One or more tests failed, see details above");
    }
  });
});

describe("Denmark", function () {
  this.timeout(10000); // Increase timeout to 10 seconds (10000ms)
  it("should pass if checkHoliday returns true for each holiday from the public API", async function () {
    let failedYears = [];
    let passedYears = [];

    for (let year of yearsToTest) {
      let fail = false;
      let holidays = await fetchHolidays(year, "DK");

      holidays.forEach((holiday) => {
        /* Check date */
        if (!checkHoliday(new Date(holiday.date), "dk")) {
          /* Failed */
          fail = true;
            console.log(
                "\x1b[31m%s\x1b[0m",
                "Failed: ",
                holiday.date,
                holiday.localName
            );
        }
      });

      if (fail) {
        failedYears.push(year);
      } else {
        passedYears.push(year);
      }
    }

    if(failedYears.length > 0) {
      console.log("\x1b[32m%s\x1b[0m", "Passed Years: ", passedYears);
      console.log("\x1b[31m%s\x1b[0m", "Failed Years: ", failedYears);
      throw new Error("One or more tests failed, see details above");
    }
  });
});