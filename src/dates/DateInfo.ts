export class DateInfo {
  public input?: Date;
  private error: boolean;
  private today: Date;
  public errorMessage: string;

  constructor(input?: Date | string) {
    this.input = input ? new Date(input) : new Date();
    this.error = new Date(input).toString().toLowerCase() === `invalid date`;
    this.today = new Date();
    this.errorMessage = this.error
      ? `DateInfo recieved "${input?.toString()}", and was unable to transform that into a date.`
      : ``;
  }

  private checkError<T>(newMessage?: string): (T) => T {
    if (this.error) throw new Error(newMessage ? newMessage : this.errorMessage);
    else return (value: T): T => value;
  }

  private formatDate(date) {
    return [date.getFullYear(), date.getMonth(), date.getDate()].toString();
  }

  private *iterator() {}

  /**
   * Comparisons
   */

  public dateIsToday() {
    const sameDate: boolean = this.formatDate(this.input) === this.formatDate(this.today);
    return this.checkError()(sameDate);
  }

  public dateIsPast() {
    const [date, today]: number[] = [this.input, this.today].map((date) => date.valueOf());
    return this.checkError()(date < today);
  }

  public dateIsFuture() {
    const [date, today]: number[] = [this.input, this.today].map((date) => date.valueOf());
    return this.checkError()(date > today);
  }

  public dateIsWithinRange(queriedDate: Date, startDate: Date, endDate: Date) {
    const [query, start, finish]: number[] = [queriedDate, startDate, endDate].map((date) => new Date(date).valueOf());
    return this.checkError()(query >= start && query <= finish);
  }

  public filterDuplicates(allDates: Date[]) {
    const uniqueDates: Date[] = allDates
      .reduce((singles, current): { date: Date; string: string }[] => {
        const formattedDate = {
          date: current,
          string: this.formatDate(current),
        };
        return singles.find(({ string }) => string === formattedDate.string) ? singles : [...singles, formattedDate];
      }, [])
      .map(({ date }) => date);
    return this.checkError()(uniqueDates);
  }

  /**
   * Generate Dates
   */

  public generateRange(startDate: Date, endDate: Date) {}
}
