export interface Node<T> {
    value: T;
    next?: Node<T>;
}
export interface Iterator<T> {
    next(value?: unknown): IteratorResult<T>;
    return?(value?: unknown): IteratorResult<T>;
    throw?(e?: unknown): IteratorResult<T>;
}
export declare type TFunction<T, R> = (t: T) => R;
export declare class LinkedList<T> {
    private EMPTY_NODE;
    private head;
    private tail;
    constructor();
    private appendToTail;
    private createNode;
    private deleteFromHead;
    append(value: T): LinkedList<T>;
    delete(value: T): boolean;
    find(compare: TFunction<T, boolean>): Node<T>;
    isEmpty(): boolean;
    items(): Iterator<Node<T>>;
    fromArray(values: T[]): LinkedList<T>;
    toArray(): T[];
}
