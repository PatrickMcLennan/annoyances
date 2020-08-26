import { head, tail } from "../arrays";

const numbers: number[] = [0, 1, 2, 3, 4];
const strings: string[] = [`0`, `1`, `2`, `3`, `4`];

test(`head`, () => {
  expect(head(numbers)).toBe(0);
  expect(head(strings)).toBe(`0`);
  expect(head([...numbers, ...strings])).toBe(0);
});

test(`tail`, () => {
  expect(tail(numbers)).toStrictEqual([1, 2, 3, 4]);
  expect(tail(strings)).toStrictEqual([`1`, `2`, `3`, `4`]);
});
