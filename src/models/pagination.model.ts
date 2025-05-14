export class Pagination<T> {
  count: number;
  rows: T[];
  constructor(
    dataClass: new (...args: any[]) => T,
    obj: { count: number; rows: T[] }
  ) {
    this.count = obj.count;
    this.rows = obj.rows.map((row) => new dataClass(row));
  }
}
