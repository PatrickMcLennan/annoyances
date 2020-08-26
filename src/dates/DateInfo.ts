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
    const [date, today]: number[] = [this.date.valueOf(), this.today.valueOf()];
    return date < today;
  }

  public dateIsFuture() {
    const [date, today]: number[] = [this.date.valueOf(), this.today.valueOf()];
    return date > today;
  }

  public dateIsWithinRange(queriedDate: Date, startDate: Date, endDate: Date): boolean {
    const [query, start, finish]: number[] = [queriedDate, startDate, endDate].map((date) => new Date(date).valueOf());
    return query >= start && query <= finish;
  }

  public filterDuplicates(allDates: Date[]): Date[] {
    const uniques: Map<string, Date> = new Map();
    allDates.forEach((date) => uniques.set(this.formatDate(date), date));
    return [...uniques.values()];
  }

  /**
   * Generate Dates
   */

  public generateRange(startDate: Date, endDate: Date) {
    let dates: Date[] = [startDate];
    let nextDate = new Date(startDate.setDate(startDate.getDate() + 1));
    const valid = startDate.valueOf() < endDate.valueOf();

    if (!valid)
      this.toggleError(`generateRange recieved ${startDate} and ${endDate}, a range cannot be generated from these.`);

    while (this.formatDate(nextDate) !== this.formatDate(endDate) && valid) {
      dates.push(nextDate);
      nextDate = new Date(nextDate.setDate(nextDate.getDate() + 1));
    }
    return dates;
  }

  public dayBefore(date: Date): Date {
    return new Date(new Date(date).setDate(new Date(date).getDate() - 1));
  }

  public yesterday(): Date {
    return new Date(this.today.setDate(this.today.getDate() - 1));
  }
}
