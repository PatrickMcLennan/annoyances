export class DateInfo {
  public date: Date;
  private error: boolean;
  private today: Date;
  public errorMessage: string;

  constructor(input: Date | string = new Date()) {
    this.date = new Date(input);
    this.error = new Date(input).toString().toLowerCase() === `invalid date`;
    this.today = new Date();
    this.errorMessage = this.error
      ? `DateInfo recieved "${input.toString()}", and was unable to transform that into a date.`
      : ``;
    return new Proxy(this, {
      get: (target, prop) => {
        if (target.error) console.warn(target.errorMessage);
        return (...args) => target[prop](...args);
      },
    });
  }

  /**
   * Helpers
   */

  private formatDate(date: Date): string {
    return [date.getFullYear(), date.getMonth(), date.getDate()].toString();
  }

  private *iterator(start: Date, end: Date) {
    let nextDate: Date = start;

    if (start.valueOf() > end.valueOf())
      return this.toggleError(`The start date given is greater than the end date, no Range can be created`);

    while (this.formatDate(nextDate) !== this.formatDate(end)) {
      nextDate = new Date(nextDate.setDate(nextDate.getDate() + 1));
      yield nextDate;
    }
    return;
  }

  private toggleError(message: string) {
    this.error = true;
    this.errorMessage = message;
  }

  /**
   * Comparisons
   */

  public dateIsToday(): boolean {
    return this.formatDate(this.date) === this.formatDate(this.today);
  }

  public dateIsPast(): boolean {
    const [date, today]: number[] = [this.date, this.today].map((date) => date.valueOf());
    return date < today;
  }

  public dateIsFuture() {
    const [date, today]: number[] = [this.date, this.today].map((date) => date.valueOf());
    return date > today;
  }

  public dateIsWithinRange(queriedDate: Date, startDate: Date, endDate: Date): boolean {
    const [query, start, finish]: number[] = [queriedDate, startDate, endDate].map((date) => new Date(date).valueOf());
    return query >= start && query <= finish;
  }

  public filterDuplicates(allDates: Date[]): Date[] {
    const uniqueDates: Date[] = allDates
      .reduce((singles, current): { date: Date; string: string }[] => {
        const formattedDate = {
          date: current,
          string: this.formatDate(current),
        };
        return singles.find(({ string }) => string === formattedDate.string) ? singles : [...singles, formattedDate];
      }, [])
      .map(({ date }) => date);
    return uniqueDates;
  }

  /**
   * Generate Dates
   */

  public generateRange(startDate: Date, endDate: Date) {
    const iterator: Generator = this.iterator(startDate, endDate);
    let dates: Date[] = [startDate];

    while (!iterator.next().done) {
      dates.push(iterator.next().value);
    }

    console.log(dates);
    // let range = iterator.next();

    // console.log(range);

    // while (!range.done) {
    //   console.log(range.value.nextDate);
    //   dates.push(range.value.nextDate);
    //   range = iterator.next();
    // }
  }
}
