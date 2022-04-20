/**
 * @param {number} min 
 * @param {number} max 
 * @param {number} value 
 * @returns 
 */
export function normalise(min, max, value) {
  return (value - min) / (max - min);
}

export function distance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

export function angle(cx, cy, ex, ey) {
  return Math.atan2(ey - cy, ex - cx);
}

/**
 * Linear interpolation
 * @param {number} start 
 * @param {number} end 
 * @param {number} t 
 */
export function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

/**
 * @param {number} x 
 */
export function sigmoid(x) {
  return Math.exp(x) / (Math.exp(x) + 1)
}