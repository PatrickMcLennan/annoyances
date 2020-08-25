import { DateInfo } from "../DateInfo";

const ShouldThrow = new DateInfo(`hello`);
const errorMessage = `DateInfo recieved "hello", and was unable to transform that into a date.`;

const Today = new DateInfo();
const today = new Date();
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

test(`dateIsToday`, () => {
  expect(Today.dateIsToday()).toBe(true);
  expect(() => Today.dateIsToday()).not.toThrowError();
  expect(() => ShouldThrow.dateIsToday()).toThrowError(errorMessage);
});

test(`dateIsPast`, () => {
  expect(new DateInfo(yesterday).dateIsPast()).toBe(true);
  expect(Today.dateIsPast()).toBe(false);
  expect(() => ShouldThrow.dateIsPast()).toThrowError(errorMessage);
});

test(`dateIsFuture`, () => {
  expect(new DateInfo(tomorrow).dateIsFuture()).toBe(true);
  expect(Today.dateIsFuture()).toBe(false);
  expect(() => ShouldThrow.dateIsFuture()).toThrowError(errorMessage);
});

test(`dateIsWithinRange`, () => {
  expect(Today.dateIsWithinRange(today, yesterday, tomorrow)).toBe(true);
  expect(Today.dateIsWithinRange(tomorrow, new Date(yesterday.setDate(yesterday.getDate() - 1)), yesterday)).toBe(
    false
  );
  expect(() => ShouldThrow.dateIsWithinRange(today, yesterday, tomorrow)).toThrowError(errorMessage);
});

test(`filterDuplicates`, () => {
  expect(Today.filterDuplicates([today, tomorrow, yesterday]).toString()).toBe([today, tomorrow, yesterday].toString());
  expect(() => ShouldThrow.filterDuplicates([today, yesterday, tomorrow])).toThrowError(errorMessage);
});

// test(`dateIsWithinRange`, () => {
//   expect(Today.dateIsWithinRange(yesterday, tomorrow)).toBe(true);
//   expect(Today.dateIsWithinRange(new Date(yesterday.setDate(yesterday.getDate() - 1)), yesterday)).toBe(false);
//   expect(() => ShouldThrow.dateIsWithinRange(yesterday, tomorrow)).toThrowError(errorMessage);
// });

// test(`filterDuplicates`, () => {
//     expect(Today.)
// })
