type CountryCode = "se" | "dk" | "no";
declare const checkHoliday: (date: string | Date, country: CountryCode) => string;
declare const getHolidays: (year: number, country: CountryCode) => string[];

export { checkHoliday, getHolidays };
