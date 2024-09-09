type CountryCode = "se" | "dk" | "no";

type supportedLanguages = "english" | "local";

type TranslatedHolidays = {
  [country in CountryCode]: {
    [holiday: string]: string;
  };
};

type FixedHoliday = {
  [holidayName: string]: [string, string];
};

type MoveableHoliday = {
  [holidayName: string]: (year: number) => string;
};

/* Helper functions */
const modulo = (a: number, b: number): number => ((a % b) + b) % b;
const performFloorDivision = (a: number, b: number): number =>
  Math.floor(a / b);

/* https://www.algorithm-archive.org/contents/computus/computus.html */
const computus = (year: number): string => {
  // Year's position on the 19 year Metonic cycle
  const a = modulo(year, 19);

  // Century index
  const k = performFloorDivision(year, 100);

  // Shift of Metonic cycle, add a day offset every 300 years
  const p = performFloorDivision(13 + 8 * k, 25);

  // Correction for non-observed leap days
  const q = performFloorDivision(k, 4);

  // Correction to starting point of calculation each century
  const M = modulo(15 - p + k - q, 30);

  // Number of days from March 21st until the full moon
  const d = modulo(19 * a + M, 30);

  // Finding the next Sunday
  // Century-based offset in weekly calculation
  const N = modulo(4 + k - q, 7);

  // Correction for leap days
  const b = modulo(year, 4);
  const c = modulo(year, 7);

  // Days from d to next Sunday
  let e = modulo(2 * b + 4 * c + 6 * d + N, 7);

  // Historical corrections for April 26 and 25
  if ((d === 29 && e === 6) || (d === 28 && e === 6 && a > 10)) {
    e = -1;
  }

  // Easter as MM-DD
  if (22 + d + e > 31) {
    return `04-${(d + e - 9).toString().padStart(2, "0")}`;
  } else {
    return `03-${(22 + d + e).toString().padStart(2, "0")}`;
  }
};

/* https://github.com/X-Y/holidays-nordic/tree/master */
const lang: TranslatedHolidays = {
  se: {
    "New Year's Day": "Nyårsdagen",
    Epiphany: "Trettondedag Jul",
    "Good Friday": "Långfredagen",
    "Easter Sunday": "Påskdagen",
    "Easter Monday": "Annandag påsk",
    "International Workers' Day": "Första Maj",
    "Ascension Day": "Kristi himmelsfärds dag",
    Pentecost: "Pingstdagen",
    "National Day of Sweden": "Sveriges nationaldag",
    "Midsummer's Day": "Midsommardagen",
    "All Saints' Day": "Alla helgons dag",
    "Christmas Eve": "Julafton",
    "Christmas Day": "Juldagen",
    "Second Day of Christmas": "Annandag Jul",
    "New Year's Eve": "Nyårsafton",
  },
  dk: {
    "New Year's Day": "Nytårsdag",
    "Maundy Thursday": "Skærtorsdag",
    "Good Friday": "Langfredag",
    "Easter Sunday": "Påskedag",
    "Easter Monday": "Anden påskedag",
    "General Prayer Day": "Store bededag",
    "Ascension Day": "Kristi Himmelfartsdag",
    Pentecost: "Pinsedag",
    "Whit Monday": "Anden pinsedag",
    "Christmas Day": "Juledag",
    "Second Day of Christmas": "Anden juledag",
    "New Year's Eve": "Nytårsaften",
  },
  no: {
    "New Year's Day": "Første nyttårsdag",
    "Maundy Thursday": "Skjærtorsdag",
    "Good Friday": "Langfredag",
    "Easter Sunday": "Første påskedag",
    "Easter Monday": "Andre påskedag",
    "International Workers' Day": "Første mai",
    "Constitution Day": "Syttende mai",
    "Ascension Day": "Kristi himmelfartsdag",
    Pentecost: "Første pinsedag",
    "Whit Monday": "Andre pinsedag",
    "Christmas Day": "Første juledag",
    "Second Day of Christmas": "Andre juledag",
    "New Year's Eve": "Nyttårsaften",
  },
};

const fixedHolidays: {
  general: FixedHoliday;
  se: FixedHoliday;
  dk: FixedHoliday;
  no: FixedHoliday;
} = {
  general: {
    "New Year's Day": ["01", "01"],
    "Christmas Eve": ["24", "12"],
    "Christmas Day": ["25", "12"],
    "Second Day of Christmas": ["26", "12"],
    "New Year's Eve": ["31", "12"],
  },
  se: {
    "International Workers' Day": ["01", "05"],
    Epiphany: ["06", "01"],
    "National Day of Sweden": ["06", "06"],
  },
  dk: {
    // Add DK specific holidays here
  },
  no: {
    "International Workers' Day": ["01", "05"],
    "Constitution Day": ["17", "05"],
  },
};

const moveableHolidays: {
  general: MoveableHoliday;
  se: MoveableHoliday;
  dk: MoveableHoliday;
  no: MoveableHoliday;
} = {
  general: {
    "Good Friday": (year: number) => getEasterDateOffset(year, -2),
    "Easter Sunday": (year: number) => getEaster(year),
    "Easter Monday": (year: number) => getEasterDateOffset(year, 1),
    "Ascension Day": (year: number) => getEasterDateOffset(year, 39),
    Pentecost: (year: number) => getEasterDateOffset(year, 49),
    "All Saints' Day": (year: number) =>
      calculateWeekdayDate(year, 6, ["31", "10"]),
  },
  se: {
    "Midsummer's Day": (year: number) =>
      calculateWeekdayDate(year, 6, ["20", "06"]),
  },
  dk: {
    "Maundy Thursday": (year: number) => calculateEasterBasedWeekday(year, -3),
    "General Prayer Day": (
      year: number // Discarded after 2023?
    ) => calculateEasterBasedWeekday(year, 26, 5),
    "Whit Monday": (year: number) => getEasterDateOffset(year, 50),
  },
  no: {
    "Maundy Thursday": (year: number) => calculateEasterBasedWeekday(year, -3),
    "Whit Monday": (year: number) => getEasterDateOffset(year, 50),
  },
};

const getEasterDateOffset = (year: number, days: number): string => {
  const easter = getEaster(year);
  const [month, day] = easter.split("-");
  const easterDate = new Date(year, parseInt(month) - 1, parseInt(day));
  easterDate.setDate(easterDate.getDate() + days);
  return `${(easterDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${easterDate.getDate().toString().padStart(2, "0")}`;
};

const calculateEasterBasedWeekday = (
  year: number,
  days: number,
  weekday: number = 4
): string => {
  const easter = getEaster(year);
  const [month, day] = easter.split("-");
  const easterDate = new Date(year, parseInt(month) - 1, parseInt(day));
  easterDate.setDate(easterDate.getDate() + days);
  while (easterDate.getDay() !== weekday) {
    easterDate.setDate(easterDate.getDate() + 1);
  }
  return `${(easterDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${easterDate.getDate().toString().padStart(2, "0")}`;
};

const calculateWeekdayDate = (
  year: number,
  weekday: number,
  date: [string, string]
): string => {
  const [day, month] = date;
  const targetDate = new Date(year, parseInt(month) - 1, parseInt(day));
  while (targetDate.getDay() !== weekday) {
    targetDate.setDate(targetDate.getDate() + 1);
  }
  return `${(targetDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${targetDate.getDate().toString().padStart(2, "0")}`;
};

const getEaster = (year: number): string => computus(year);

const checkForFixedHoliday = (
  date: string,
  country: CountryCode,
  language: supportedLanguages = "local"
): string => {
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

const checkForMoveableHoliday = (
  date: string,
  country: CountryCode,
  language: supportedLanguages = "local"
): string => {
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

export const checkHoliday = (
  date: string | Date,
  country: CountryCode,
  language: supportedLanguages = "local"
): string => {
  if (!date || !country) {
    throw new Error(
      "Date and country are required, e.g. checkHoliday('2024-12-25', 'se')"
    );
  }
  /* if date is of type Date, convert it to string */
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

export const getHolidays = (
  year: number,
  country: CountryCode,
  language: supportedLanguages = "local"
): { [key: string]: string } => {
  if (!year || !country) {
    throw new Error(
      "Year and country are required, e.g. getHolidays(2024, 'se')"
    );
  }
  const holidays: { [key: string]: string } = {};

  const addHoliday = (holiday: string, holidayDate: string) => {
    const [holidayMonth, holidayDay] = holidayDate.split("-");
    const name = language === "local" ? lang[country][holiday] : holiday;
    holidays[name] = `${year}-${holidayMonth}-${holidayDay}`;
  };

  // Add fixed and moveable holidays
  const addHolidays = (holidaySet: FixedHoliday | MoveableHoliday) => {
    for (const holiday in holidaySet) {
      const holidayDate = typeof holidaySet[holiday] === "function"
        ? holidaySet[holiday](year)
        : `${holidaySet[holiday][1]}-${holidaySet[holiday][0]}`;
      addHoliday(holiday, holidayDate);
    }
  };

  addHolidays(fixedHolidays.general);
  if (fixedHolidays[country]) addHolidays(fixedHolidays[country]);
  addHolidays(moveableHolidays.general);
  if (moveableHolidays[country]) addHolidays(moveableHolidays[country]);

  return holidays;
};
