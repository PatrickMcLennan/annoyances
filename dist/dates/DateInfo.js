"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
                    return target[prop].apply(target, args);
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
    DateInfo.prototype.iterator = function (start, end) {
        var nextDate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nextDate = start;
                    if (start.valueOf() > end.valueOf())
                        return [2 /*return*/, this.toggleError("The start date given is greater than the end date, no Range can be created")];
                    _a.label = 1;
                case 1:
                    if (!(this.formatDate(nextDate) !== this.formatDate(end))) return [3 /*break*/, 3];
                    nextDate = new Date(nextDate.setDate(nextDate.getDate() + 1));
                    return [4 /*yield*/, nextDate];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
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
        var _a = [this.date, this.today].map(function (date) { return date.valueOf(); }), date = _a[0], today = _a[1];
        return date < today;
    };
    DateInfo.prototype.dateIsFuture = function () {
        var _a = [this.date, this.today].map(function (date) { return date.valueOf(); }), date = _a[0], today = _a[1];
        return date > today;
    };
    DateInfo.prototype.dateIsWithinRange = function (queriedDate, startDate, endDate) {
        var _a = [queriedDate, startDate, endDate].map(function (date) { return new Date(date).valueOf(); }), query = _a[0], start = _a[1], finish = _a[2];
        return query >= start && query <= finish;
    };
    DateInfo.prototype.filterDuplicates = function (allDates) {
        var _this = this;
        var uniqueDates = allDates
            .reduce(function (singles, current) {
            var formattedDate = {
                date: current,
                string: _this.formatDate(current),
            };
            return singles.find(function (_a) {
                var string = _a.string;
                return string === formattedDate.string;
            }) ? singles : __spreadArrays(singles, [formattedDate]);
        }, [])
            .map(function (_a) {
            var date = _a.date;
            return date;
        });
        return uniqueDates;
    };
    /**
     * Generate Dates
     */
    DateInfo.prototype.generateRange = function (startDate, endDate) {
        var iterator = this.iterator(startDate, endDate);
        var dates = [startDate];
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
    };
    return DateInfo;
}());
exports.DateInfo = DateInfo;
