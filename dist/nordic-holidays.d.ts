type CountryCode = "se" | "dk" | "no";
type supportedLanguages = "english" | "local";
declare const checkHoliday: (date: string | Date, country: CountryCode, language?: supportedLanguages) => string;
declare const getHolidays: (year: number, country: CountryCode, language?: supportedLanguages) => {
    [key: string]: string;
};

export { checkHoliday, getHolidays };
