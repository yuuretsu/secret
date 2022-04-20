export class Vec2 extends Array {
  constructor(x, y) {
    super();
    /** @type {number} */
    this[0] = x;
    /** @type {number} */
    this[1] = y;
  }
  get x() { return this[0]; }
  get y() { return this[1]; }
  set x(value) { this[0] = value; }
  set y(value) { this[1] = value; }
  /**
   * @param {number} x 
   * @param {number} y 
   */
  add(x, y) {
    return new Vec2(this.x + x, this.y + y);
  }
  /**
   * @param {number} x 
   * @param {number} y 
   */
  sub(x, y) {
    return new Vec2(this.x - x, this.y - y);
  }
  /**
   * @param {number} x 
   * @param {number} y 
   */
  mul(x, y) {
    return new Vec2(this.x * x, this.y * y);
  }
  /**
   * @param {number} x 
   * @param {number} y 
   */
  div(x, y) {
    return new Vec2(this.x / x, this.y / y);
  }
  /** 
   * @param {number} angle
   * @param {number} length
   */
  lineEnd(angle, length) {
    return new Vec2(
      Math.cos(angle) * length + this.x,
      Math.sin(angle) * length + this.y,
    );
  }
  /**
   * @param {number} x 
   * @param {number} y 
   */
  distance(x, y) {
    return Math.hypot(this.x - x, this.y - y);
  }
  angle(x, y) {
    return Math.atan2(y - this.y, x - this.x);
  }
  /**
   * @param {(a: number, b: number, t: number) => number} fn 
   * @param {number} x 
   * @param {number} y 
   * @param {number} t 
   */
  interpolate(fn, x, y, t) {
    return new Vec2(
      fn(this.x, x, t),
      fn(this.y, y, t)
    );
  }
}
