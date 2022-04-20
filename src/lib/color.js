export class Rgba extends Array {
  constructor(r, g, b, a = 255) {
    super();
    /** @type {number} */
    this[0] = r;
    /** @type {number} */
    this[1] = g;
    /** @type {number} */
    this[2] = b;
    /** @type {number} */
    this[3] = a;
  }
  /**
   * @param {Rgba[][]} array 
   */
  static imageData(array) {
    const width = array[0].length;
    const height = array.length;
    const data = new ImageData(width, height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pointer = (x + y * width) * 4;
        data.data[pointer + 0] = array[y][x][0];
        data.data[pointer + 1] = array[y][x][1];
        data.data[pointer + 2] = array[y][x][2];
        data.data[pointer + 3] = array[y][x][3];
      }
    }
    return data;
  }
  get red() { return this[0]; };
  get green() { return this[1]; };
  get blue() { return this[2]; };
  get alpha() { return this[3]; };
  get r() { return this.red; };
  get g() { return this.green; };
  get b() { return this.blue; };
  get a() { return this.alpha; };
  set red(value) { this[0] = value; }
  set green(value) { this[1] = value; }
  set blue(value) { this[2] = value; }
  set alpha(value) { this[3] = value; }
  set r(value) { this.red = value; }
  set g(value) { this.green = value; }
  set b(value) { this.blue = value; }
  set a(value) { this.alpha = value; }
  withChannel(channel, value) {
    const newColor = new Rgba(...this);
    newColor[channel] = value;
    return newColor;
  }
  withRed(value) {
    return this.withChannel(0, value);
  }
  withGreen(value) {
    return this.withChannel(1, value);
  }
  withBlue(value) {
    return this.withChannel(2, value);
  }
  withAlpha(value) {
    return this.withChannel(3, value);
  }
  /**
   * @param {(a: number, b: number, t: number) => number} fn 
   * @param {number} r 
   * @param {number} g
   * @param {number} b 
   * @param {number} a
   * @param {number} t
   */
  interpolate(fn, r, g, b, a, t) {
    return new Rgba(
      fn(this.r, r, t),
      fn(this.g, g, t),
      fn(this.b, b, t),
      fn(this.a, a, t),
    );
  }
  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a / 255})`;
  }
}