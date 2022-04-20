export class Grid {
  constructor(width, height, value) {
    this.width = width;
    this.height = height;
    this.cells = [];
    for (let y = 0; y < height; y++) {
      this.cells[y] = [];
      for (let x = 0; x < width; x++) {
        this.cells[y][x] = value;
      }
    }
  }
  get(x, y) {
    return this.cells[y]?.[x];
  }
  set(x, y, value) {
    this.cells[y][x] = value;
  }
  swap(x1, y1, x2, y2) {
    const temp = this.get(x1, y1);
    this.set(x1, y1, this.get(x2, y2));
    this.set(x2, y2, temp);
  }
  forEach(fn) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        fn(this.get(x, y), x, y);
      }
    }
  }
  map(fn) {
    const newGrid = new Grid(this.width, this.height);
    this.forEach((val, x, y) => newGrid.set(x, y, fn(val, x, y)));
    return newGrid;
  }
  toArray() {
    return this.cells.flat();
  }
}