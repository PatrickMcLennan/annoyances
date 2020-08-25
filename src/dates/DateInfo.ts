export class DateInfo {
  public input: Date;
  private error: boolean;
  private today: Date;
  public errorMessage: string;

  constructor(input: Date | string = new Date()) {
    this.input = new Date(input);
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

  private formatDate(date: Date): string {
    return [date.getFullYear(), date.getMonth(), date.getDate()].toString();
  }

  private *iterator() {}

  /**
   * Comparisons
   */

  public dateIsToday(): boolean {
    return this.formatDate(this.input) === this.formatDate(this.today);
  }

  public dateIsPast(): boolean {
    const [date, today]: number[] = [this.input, this.today].map((date) => date.valueOf());
    return date < today;
  }

  public dateIsFuture() {
    const [date, today]: number[] = [this.input, this.today].map((date) => date.valueOf());
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

  public generateRange(startDate: Date, endDate: Date) {}
}
