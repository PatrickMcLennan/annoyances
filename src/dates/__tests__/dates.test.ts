import { DateInfo } from "../DateInfo";

const ShouldThrow: DateInfo = new DateInfo(`hello`);
const errorMessage: string = `DateInfo recieved "hello", and was unable to transform that into a date.`;

const Today: DateInfo = new DateInfo();
const today: Date = new Date();
const yesterday: Date = new Date(new Date().setDate(new Date().getDate() - 1));
const tomorrow: Date = new Date(new Date().setDate(new Date().getDate() + 1));

const errorLog = console.warn;

beforeEach(() => (console.warn = jest.fn()));

const ensureWarning = (message = errorMessage) => {
  expect(console.warn).toBeCalledWith(message);
  expect(console.warn).toBeCalledTimes(1);
};

test(`dateIsToday`, () => {
  expect(Today.dateIsToday()).toBe(true);
  expect(() => Today.dateIsToday()).not.toThrowError();
  ShouldThrow.dateIsToday();
  return ensureWarning();
});

test(`dateIsPast`, () => {
  expect(new DateInfo(yesterday).dateIsPast()).toBe(true);
  expect(Today.dateIsPast()).toBe(false);
  ShouldThrow.dateIsPast();
  return ensureWarning();
});

test(`dateIsFuture`, () => {
  expect(new DateInfo(tomorrow).dateIsFuture()).toBe(true);
  expect(Today.dateIsFuture()).toBe(false);
  ShouldThrow.dateIsFuture();
  return ensureWarning();
});

test(`dateIsWithinRange`, () => {
  console.log(tomorrow.valueOf() > today.valueOf());
  console.log(yesterday.valueOf() < today.valueOf());
  expect(Today.dateIsWithinRange(today, yesterday, tomorrow)).toBe(true);
  expect(Today.dateIsWithinRange(yesterday, today, tomorrow)).toBe(false);
  ShouldThrow.dateIsWithinRange(today, yesterday, tomorrow);
  return ensureWarning();
});

// test(`filterDuplicates`, () => {
//   expect(Today.filterDuplicates([today, tomorrow, yesterday]).toString()).toBe([today, tomorrow, yesterday].toString());
//   expect(() => ShouldThrow.filterDuplicates([today, yesterday, tomorrow])).toThrowError(errorMessage);
// });

// test(`dateIsWithinRange`, () => {
//   expect(Today.dateIsWithinRange(today, yesterday, tomorrow)).toBe(true);
//   expect(Today.dateIsWithinRange(new Date(yesterday.setDate(yesterday.getDate() - 1)), yesterday, today)).toBe(false);
//   expect(() => ShouldThrow.dateIsWithinRange(today, yesterday, tomorrow)).toThrowError(errorMessage);
// });

// test(`filterDuplicates`, () => {
//     expect(Today.)
// })
