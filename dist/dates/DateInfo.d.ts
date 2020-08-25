export declare class DateInfo {
    date: Date;
    private error;
    private today;
    errorMessage: string;
    constructor(input?: Date | string);
    /**
     * Helpers
     */
    private formatDate;
    private iterator;
    private toggleError;
    /**
     * Comparisons
     */
    dateIsToday(): boolean;
    dateIsPast(): boolean;
    dateIsFuture(): boolean;
    dateIsWithinRange(queriedDate: Date, startDate: Date, endDate: Date): boolean;
    filterDuplicates(allDates: Date[]): Date[];
    /**
     * Generate Dates
     */
    generateRange(startDate: Date, endDate: Date): void;
}
