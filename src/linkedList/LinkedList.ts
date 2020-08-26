export interface Node<T> {
  value: T;
  next?: Node<T>;
}

export interface Iterator<T> {
  next(value?: unknown): IteratorResult<T>;
  return?(value?: unknown): IteratorResult<T>;
  throw?(e?: unknown): IteratorResult<T>;
}

export type TFunction<T, R> = (t: T) => R;

export class LinkedList<T> {
  private EMPTY_NODE: Node<T> = { value: null, next: null };
  private head: Node<T>;
  private tail: Node<T>;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  private appendToTail(node: Node<T>) {
    this.tail.next = node;
    this.tail = node;
  }

  private createNode(value: T): Node<T> {
    return {
      value,
      next: null,
    };
  }

  private deleteFromHead(value: T): boolean {
    let deleted: boolean = false;

    while (this.head.value === value) {
      deleted = true;
      this.head = this.head.next;
    }

    return deleted;
  }

  public append(value: T): LinkedList<T> {
    const node: Node<T> = this.createNode(value);
    const isHead = this.isEmpty();

    if (isHead) {
      this.head = node;
      this.tail = node;
    } else this.appendToTail(node);

    return this;
  }

  public delete(value: T): boolean {
    let deleted: boolean = false;
    const empty = this.isEmpty();

    if (empty) return deleted;

    deleted = this.deleteFromHead(value);

    let current = this.head ?? this.EMPTY_NODE;
    while (current.next) {
      if (current.next.value === value) {
        deleted = true;
        current.next = current.next.next;
      } else current = current.next;
    }

    if (this.tail.value === value) this.tail = current;

    return deleted;
  }

  public find(compare: TFunction<T, boolean>) {
    const empty: boolean = this.isEmpty();
    if (empty) return null;

    let node = this.head;
    while (node) {
      if (compare(node.value)) return node;
      else node = node.next;
    }
    return null;
  }

  public isEmpty(): boolean {
    return !this.head;
  }

  public *items(): Iterator<Node<T>> {
    let node = this.head;

    while (node) {
      yield node;
      node = node.next;
    }
  }

  public fromArray(values: T[]): LinkedList<T> {
    values.forEach((value) => this.append(value));
    return this;
  }

  public toArray(): T[] {
    const result: T[] = [];
    let node = this.head;

    while (node) {
      result.push(node.value);
      node = node.next;
    }

    return result;
  }
}
