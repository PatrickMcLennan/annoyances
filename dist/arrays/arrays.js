"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tail = exports.head = void 0;
function head(array) {
    return array[0];
}
exports.head = head;
function tail(array) {
    return array.splice(1, array.length - 1);
}
exports.tail = tail;
