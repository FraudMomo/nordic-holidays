// src/nordic-holidays.ts
var modulo = (a, b) => (a % b + b) % b;
var performFloorDivision = (a, b) => Math.floor(a / b);
var computus = (year) => {
  const a = modulo(year, 19);
  const k = performFloorDivision(year, 100);
  const p = performFloorDivision(13 + 8 * k, 25);
  const q = performFloorDivision(k, 4);
  const M = modulo(15 - p + k - q, 30);
  const d = modulo(19 * a + M, 30);
  const N = modulo(4 + k - q, 7);
  const b = modulo(year, 4);
  const c = modulo(year, 7);
  let e = modulo(2 * b + 4 * c + 6 * d + N, 7);
  if (d === 29 && e === 6 || d === 28 && e === 6 && a > 10) {
    e = -1;
  }
  if (22 + d + e > 31) {
    return `04-${(d + e - 9).toString().padStart(2, "0")}`;
  } else {
    return `03-${(22 + d + e).toString().padStart(2, "0")}`;
  }
};
var lang = {
  se: {
    "New Year's Day": "Ny\xE5rsdagen",
    Epiphany: "Trettondedag Jul",
    "Good Friday": "L\xE5ngfredagen",
    "Easter Sunday": "P\xE5skdagen",
    "Easter Monday": "Annandag p\xE5sk",
    "International Workers' Day": "F\xF6rsta Maj",
    "Ascension Day": "Kristi himmelsf\xE4rds dag",
    Pentecost: "Pingstdagen",
    "National Day of Sweden": "Sveriges nationaldag",
    "Midsummer's Day": "Midsommardagen",
    "All Saints' Day": "Alla helgons dag",
    "Christmas Eve": "Julafton",
    "Christmas Day": "Juldagen",
    "Second Day of Christmas": "Annandag Jul",
    "New Year's Eve": "Ny\xE5rsafton"
  },
  dk: {
    "New Year's Day": "Nyt\xE5rsdag",
    "Maundy Thursday": "Sk\xE6rtorsdag",
    "Good Friday": "Langfredag",
    "Easter Sunday": "P\xE5skedag",
    "Easter Monday": "Anden p\xE5skedag",
    "General Prayer Day": "Store bededag",
    "Ascension Day": "Kristi Himmelfartsdag",
    Pentecost: "Pinsedag",
    "Whit Monday": "Anden pinsedag",
    "Christmas Day": "Juledag",
    "Second Day of Christmas": "Anden juledag",
    "New Year's Eve": "Nyt\xE5rsaften"
  },
  no: {
    "New Year's Day": "F\xF8rste nytt\xE5rsdag",
    "Maundy Thursday": "Skj\xE6rtorsdag",
    "Good Friday": "Langfredag",
    "Easter Sunday": "F\xF8rste p\xE5skedag",
    "Easter Monday": "Andre p\xE5skedag",
    "International Workers' Day": "F\xF8rste mai",
    "Constitution Day": "Syttende mai",
    "Ascension Day": "Kristi himmelfartsdag",
    Pentecost: "F\xF8rste pinsedag",
    "Whit Monday": "Andre pinsedag",
    "Christmas Day": "F\xF8rste juledag",
    "Second Day of Christmas": "Andre juledag",
    "New Year's Eve": "Nytt\xE5rsaften"
  }
};
var fixedHolidays = {
  general: {
    "New Year's Day": ["01", "01"],
    "Christmas Eve": ["24", "12"],
    "Christmas Day": ["25", "12"],
    "Second Day of Christmas": ["26", "12"],
    "New Year's Eve": ["31", "12"]
  },
  se: {
    "International Workers' Day": ["01", "05"],
    Epiphany: ["06", "01"],
    "National Day of Sweden": ["06", "06"]
  },
  dk: {
    // Add DK specific holidays here
  },
  no: {
    "International Workers' Day": ["01", "05"],
    "Constitution Day": ["17", "05"]
  }
};
var moveableHolidays = {
  general: {
    "Good Friday": (year) => getEasterDateOffset(year, -2),
    "Easter Sunday": (year) => getEaster(year),
    "Easter Monday": (year) => getEasterDateOffset(year, 1),
    "Ascension Day": (year) => getEasterDateOffset(year, 39),
    Pentecost: (year) => getEasterDateOffset(year, 49),
    "All Saints' Day": (year) => calculateWeekdayDate(year, 6, ["31", "10"])
  },
  se: {
    "Midsummer's Day": (year) => calculateWeekdayDate(year, 6, ["20", "06"])
  },
  dk: {
    "Maundy Thursday": (year) => calculateEasterBasedWeekday(year, -3),
    "General Prayer Day": (year) => calculateEasterBasedWeekday(year, 26, 5),
    "Whit Monday": (year) => getEasterDateOffset(year, 50)
  },
  no: {
    "Maundy Thursday": (year) => calculateEasterBasedWeekday(year, -3),
    "Whit Monday": (year) => getEasterDateOffset(year, 50)
  }
};
var getEasterDateOffset = (year, days) => {
  const easter = getEaster(year);
  const [month, day] = easter.split("-");
  const easterDate = new Date(year, parseInt(month) - 1, parseInt(day));
  easterDate.setDate(easterDate.getDate() + days);
  return `${(easterDate.getMonth() + 1).toString().padStart(2, "0")}-${easterDate.getDate().toString().padStart(2, "0")}`;
};
var calculateEasterBasedWeekday = (year, days, weekday = 4) => {
  const easter = getEaster(year);
  const [month, day] = easter.split("-");
  const easterDate = new Date(year, parseInt(month) - 1, parseInt(day));
  easterDate.setDate(easterDate.getDate() + days);
  while (easterDate.getDay() !== weekday) {
    easterDate.setDate(easterDate.getDate() + 1);
  }
  return `${(easterDate.getMonth() + 1).toString().padStart(2, "0")}-${easterDate.getDate().toString().padStart(2, "0")}`;
};
var calculateWeekdayDate = (year, weekday, date) => {
  const [day, month] = date;
  const targetDate = new Date(year, parseInt(month) - 1, parseInt(day));
  while (targetDate.getDay() !== weekday) {
    targetDate.setDate(targetDate.getDate() + 1);
  }
  return `${(targetDate.getMonth() + 1).toString().padStart(2, "0")}-${targetDate.getDate().toString().padStart(2, "0")}`;
};
var getEaster = (year) => computus(year);
var checkForFixedHoliday = (date, country, language = "local") => {
  const [year, month, day] = date.split("-");
  for (const holiday in fixedHolidays.general) {
    const [holidayDay, holidayMonth] = fixedHolidays.general[holiday];
    if (holidayDay === day && holidayMonth === month) {
      if (language === "english") return holiday;
      return lang[country][holiday];
    }
  }
  if (fixedHolidays[country]) {
    for (const holiday in fixedHolidays[country]) {
      const [holidayDay, holidayMonth] = fixedHolidays[country][holiday];
      if (holidayDay === day && holidayMonth === month) {
        if (language === "english") return holiday;
        return lang[country][holiday];
      }
    }
  }
  return "";
};
var checkForMoveableHoliday = (date, country, language = "local") => {
  const [year, month, day] = date.split("-");
  if (moveableHolidays.general) {
    for (const holiday in moveableHolidays.general) {
      const holidayDate = moveableHolidays.general[holiday](parseInt(year));
      const [holidayMonth, holidayDay] = holidayDate.split("-");
      if (holidayDay === day && holidayMonth === month) {
        if (language === "english") return holiday;
        return lang[country][holiday];
      }
    }
  }
  if (moveableHolidays[country]) {
    for (const holiday in moveableHolidays[country]) {
      const holidayDate = moveableHolidays[country][holiday](parseInt(year));
      const [holidayMonth, holidayDay] = holidayDate.split("-");
      if (holidayDay === day && holidayMonth === month) {
        if (language === "english") return holiday;
        return lang[country][holiday];
      }
    }
  }
  return "";
};
var checkHoliday = (date, country, language = "local") => {
  if (!date || !country) {
    throw new Error(
      "Date and country are required, e.g. checkHoliday('2024-12-25', 'se')"
    );
  }
  if (date instanceof Date) {
    date = date.toISOString().split("T")[0];
  }
  const fixedHoliday = checkForFixedHoliday(date, country, language);
  if (fixedHoliday) {
    return fixedHoliday;
  }
  const moveableHoliday = checkForMoveableHoliday(date, country, language);
  if (moveableHoliday) {
    return moveableHoliday;
  }
  return "";
};
var getHolidays = (year, country, language = "local") => {
  if (!year || !country) {
    throw new Error(
      "Year and country are required, e.g. getHolidays(2024, 'se')"
    );
  }
  const holidays = {};
  const addHoliday = (holiday, holidayDate) => {
    const [holidayMonth, holidayDay] = holidayDate.split("-");
    const name = language === "local" ? lang[country][holiday] : holiday;
    holidays[name] = `${year}-${holidayMonth}-${holidayDay}`;
  };
  const addHolidays = (holidaySet) => {
    for (const holiday in holidaySet) {
      const holidayDate = typeof holidaySet[holiday] === "function" ? holidaySet[holiday](year) : `${holidaySet[holiday][1]}-${holidaySet[holiday][0]}`;
      addHoliday(holiday, holidayDate);
    }
  };
  addHolidays(fixedHolidays.general);
  if (fixedHolidays[country]) addHolidays(fixedHolidays[country]);
  addHolidays(moveableHolidays.general);
  if (moveableHolidays[country]) addHolidays(moveableHolidays[country]);
  return holidays;
};
export {
  checkHoliday,
  getHolidays
};
