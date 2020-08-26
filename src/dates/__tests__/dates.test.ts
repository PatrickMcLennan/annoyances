import { DateInfo } from "../DateInfo";

const ShouldThrow: DateInfo = new DateInfo(`hello`);
const errorMessage: string = `DateInfo recieved "hello", and was unable to transform that into a date.`;

const Today: DateInfo = new DateInfo();
const today: Date = new Date();
const yesterday: Date = new Date(new Date().setDate(new Date().getDate() - 1));
const tomorrow: Date = new Date(new Date().setDate(new Date().getDate() + 1));

const aWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7));
const correctWeek: string[] = [...Array(7).keys()]
  .map((number) => {
    const date: Date = new Date(new Date().setDate(new Date().getDate() - number));
    return [date.getFullYear(), date.getMonth(), date.getDate()].toString();
  })
  .reverse();

const ensureWarning = (message = errorMessage) => {
  expect(console.warn).toBeCalledWith(message);
  expect(console.warn).toBeCalledTimes(1);
};

beforeEach(() => (console.warn = jest.fn()));
afterEach(() => ensureWarning());

/**
 * Comparisons
 */

test(`dateIsToday`, () => {
  expect(Today.dateIsToday()).toBe(true);
  expect(() => Today.dateIsToday()).not.toThrowError();
  expect(console.warn).not.toHaveBeenCalled();
  ShouldThrow.dateIsToday();
});

test(`dateIsPast`, () => {
  expect(new DateInfo(yesterday).dateIsPast()).toBe(true);
  expect(new DateInfo(tomorrow).dateIsPast()).toBe(false);
  expect(console.warn).not.toHaveBeenCalled();
  ShouldThrow.dateIsPast();
});

test(`dateIsFuture`, () => {
  expect(new DateInfo(tomorrow).dateIsFuture()).toBe(true);
  expect(Today.dateIsFuture()).toBe(false);
  expect(console.warn).not.toHaveBeenCalled();
  ShouldThrow.dateIsFuture();
});

test(`dateIsWithinRange`, () => {
  expect(Today.dateIsWithinRange(today, yesterday, tomorrow)).toBe(true);
  expect(Today.dateIsWithinRange(yesterday, today, tomorrow)).toBe(false);
  expect(console.warn).not.toHaveBeenCalled();
  ShouldThrow.dateIsWithinRange(today, yesterday, tomorrow);
});

test(`filterDuplicates`, () => {
  expect(Today.filterDuplicates([today, tomorrow, yesterday]).toString()).toBe([today, tomorrow, yesterday].toString());
  expect(Today.filterDuplicates([today, tomorrow, yesterday, yesterday, tomorrow]).toString()).toBe(
    [today, tomorrow, yesterday].toString()
  );
  expect(console.warn).not.toHaveBeenCalled();
  ShouldThrow.filterDuplicates([today, tomorrow, yesterday]);
});

/**
 * Generate Dates
 */

test(`generateRange`, () => {
  expect(
    Today.generateRange(aWeekAgo, today).map((returnedDate) => {
      const date: Date = new Date(returnedDate);
      return [date.getFullYear(), date.getMonth(), date.getDate()].toString();
    })
  ).toStrictEqual(correctWeek);
  expect(console.warn).not.toHaveBeenCalled();
  ShouldThrow.generateRange(aWeekAgo, today);
});

test(`dayBefore`, () => {
  expect(Today.dayBefore(today)).toStrictEqual(yesterday);
  expect(console.warn).not.toHaveBeenCalled();
  ShouldThrow.dayBefore(today);
});

test(`yesterday`, () => {
  expect(Today.yesterday()).toStrictEqual(yesterday);
  expect(console.warn).not.toHaveBeenCalled();
  ShouldThrow.yesterday();
});
