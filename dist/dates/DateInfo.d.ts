export declare class DateInfo {
    input?: Date;
    private error;
    private today;
    errorMessage: string;
    constructor(input?: Date | string);
    private checkError;
    private formatDate;
    private iterator;
    /**
     * Comparisons
     */
    dateIsToday(): unknown;
    dateIsPast(): unknown;
    dateIsFuture(): unknown;
    dateIsWithinRange(queriedDate: Date, startDate: Date, endDate: Date): unknown;
    filterDuplicates(allDates: Date[]): unknown;
    /**
     * Generate Dates
     */
    generateRange(startDate: Date, endDate: Date): void;
}
