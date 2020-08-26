"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateInfo = void 0;
var DateInfo = /** @class */ (function () {
    function DateInfo(input) {
        if (input === void 0) { input = new Date(); }
        this.date = new Date(input);
        this.error = new Date(input).toString().toLowerCase() === "invalid date";
        this.today = new Date();
        this.errorMessage = this.error
            ? "DateInfo recieved \"" + input.toString() + "\", and was unable to transform that into a date."
            : "";
        return new Proxy(this, {
            get: function (target, prop) {
                if (target.error)
                    console.warn(target.errorMessage);
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return target[prop].apply(target, __spread(args));
                };
            },
        });
    }
    /**
     * Helpers
     */
    DateInfo.prototype.formatDate = function (date) {
        return [date.getFullYear(), date.getMonth(), date.getDate()].toString();
    };
    DateInfo.prototype.toggleError = function (message) {
        this.error = true;
        this.errorMessage = message;
    };
    /**
     * Comparisons
     */
    DateInfo.prototype.dateIsToday = function () {
        return this.formatDate(this.date) === this.formatDate(this.today);
    };
    DateInfo.prototype.dateIsPast = function () {
        var _a = __read([this.date.valueOf(), this.today.valueOf()], 2), date = _a[0], today = _a[1];
        return date < today;
    };
    DateInfo.prototype.dateIsFuture = function () {
        var _a = __read([this.date.valueOf(), this.today.valueOf()], 2), date = _a[0], today = _a[1];
        return date > today;
    };
    DateInfo.prototype.dateIsWithinRange = function (queriedDate, startDate, endDate) {
        var _a = __read([queriedDate, startDate, endDate].map(function (date) { return new Date(date).valueOf(); }), 3), query = _a[0], start = _a[1], finish = _a[2];
        return query >= start && query <= finish;
    };
    DateInfo.prototype.filterDuplicates = function (allDates) {
        var _this = this;
        var uniques = new Map();
        allDates.forEach(function (date) { return uniques.set(_this.formatDate(date), date); });
        return __spread(uniques.values());
    };
    /**
     * Generate Dates
     */
    DateInfo.prototype.generateRange = function (startDate, endDate) {
        var dates = [startDate];
        var nextDate = new Date(startDate.setDate(startDate.getDate() + 1));
        var valid = startDate.valueOf() < endDate.valueOf();
        if (!valid)
            this.toggleError("generateRange recieved " + startDate + " and " + endDate + ", a range cannot be generated from these.");
        while (this.formatDate(nextDate) !== this.formatDate(endDate) && valid) {
            dates.push(nextDate);
            nextDate = new Date(nextDate.setDate(nextDate.getDate() + 1));
        }
        return dates;
    };
    DateInfo.prototype.dayBefore = function (date) {
        return new Date(new Date(date).setDate(new Date(date).getDate() - 1));
    };
    DateInfo.prototype.yesterday = function () {
        return new Date(this.today.setDate(this.today.getDate() - 1));
    };
    return DateInfo;
}());
exports.DateInfo = DateInfo;
