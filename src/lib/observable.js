export class Observable {
  constructor(value) {
    this._value = value;
    this.subscribers = new Set();
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this.set(value);
  }
  get $() {
    return this.value;
  }
  set $(value) {
    this.set(value);
  }
  subscribe(fn) {
    fn(this.value);
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
  set(value) {
    this._value = value;
    for (const fn of this.subscribers) {
      fn(value);
    }
  }
  update(callback) {
    this.set(callback(this.value));
  }
}