import { Rgba } from "./lib/color";
import { Layer } from "./lib/layer";
import { Vec2 } from "./lib/vec2";
import { lerp, sigmoid } from "./lib/math";
import { randChoice, randFloat } from "./lib/random";
import Simplex from "simplex-noise";

/**
 * @param {Vec2} point 
 */
function circle(point) {
  const r = ((simplex.noise2D(...point.map(x => x * MAP_SIZE)) + 1) / 2) ** HILLS;
  const middle = new Vec2(point.x, 0.5);
  point.y += point.distance(...middle) * (point.y < 0.5 ? 1 : -1) * 0.75;
  point.y -= r * DISTORTION;
  point.y += DISTORTION / 2;
  if (fxrand() > 0.1 && r < 0.5 && r > 0.01) {
    ctx.strokeStyle = new Rgba(
      randFloat(fxrand, 40, 60),
      randFloat(fxrand, 80, 120),
      randFloat(fxrand, 40, 60),
    );
    ctx.lineCap = "round";
    tree(point, randFloat(fxrand, 0.001, 0.01))
  };
  ctx.beginPath();
  ctx.arc(...point, 0.003, 0, PI_2);
  ctx.fillStyle = r < 0.01
    ? WATER_COLOR.interpolate(lerp, ...new Rgba(0, 0, 0), r * 50)
    : r < 0.5
      ? LAND_COLOR
        .interpolate(lerp, ...new Rgba(255, 255, 0), r ** 2)
      : "white"
  ctx.fill();
}

/**
 * @param {Vec2} point
 * @param {number} height
 */
function tree(point, height) {
  ctx.beginPath();
  ctx.moveTo(...point);
  ctx.lineTo(...point.lineEnd(-Math.PI / 2, height));
  ctx.lineWidth = 0.001;
  ctx.stroke();
}

const DISTORTION = randFloat(() => fxrand() ** 2, 0.05, 0.2);
const HILLS = randFloat(() => fxrand() ** 2, 3, 20);
const MAP_SIZE = randFloat(() => fxrand() ** 2, 3, 10);

const WATER_COLOR = new Rgba(
  100,
  150,
  200,
);

const LAND_COLOR = new Rgba(50, 100, 50);

const SCALE = 2000;

const PI_2 = Math.PI * 2;

const simplex = new Simplex();

const { canvas, ctx } = new Layer(SCALE, SCALE);
ctx.scale(SCALE, SCALE);
document.body.appendChild(canvas);

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 1, 1);

const CENTER = new Vec2(0.5, 0.5);

const points = Array
  .from({ length: 100000 }, () => CENTER.lineEnd(fxrand() * PI_2, Math.sqrt(fxrand()) * 0.4))
  .sort((a, b) => a.y - b.y);

const pointsA = points.slice(0, Math.round(points.length / 2));
const pointsB = points.slice(Math.round(points.length / 2));


const r = 0.4;

// фоновый ободок
ctx.beginPath();
ctx.ellipse(...CENTER, r, r * 0.25, 0, Math.PI, 0);
ctx.strokeStyle = `rgba(127, 127, 127, 0.35)`;
ctx.lineWidth = 0.001;
ctx.stroke();

for (const point of pointsA) {
  circle(point);
}

// небо
ctx.beginPath();
ctx.arc(...CENTER, r, 0, PI_2);
const gradient = ctx.createLinearGradient(
  ...CENTER.lineEnd(-Math.PI / 2, r),
  ...CENTER.lineEnd(Math.PI / 2, 0),
);
gradient.addColorStop(0, 'rgba(150, 200, 255, 0.2)');
gradient.addColorStop(1, 'transparent');
ctx.fillStyle = gradient;
ctx.fill();

// солнце
ctx.beginPath();
ctx.arc(...CENTER, r * 0.3, 0, PI_2);
const gradient2 = ctx.createLinearGradient(
  ...CENTER.lineEnd(-Math.PI / 2, r),
  ...CENTER.lineEnd(Math.PI / 2, r),
);
gradient2.addColorStop(0, 'red');
gradient2.addColorStop(1, 'transparent');
ctx.fillStyle = "rgba(255, 0, 0, 0.75)";
ctx.fill();

ctx.beginPath();
ctx.arc(...CENTER, r, 0, PI_2);
ctx.strokeStyle = `rgba(127, 127, 127, 0.35)`;
ctx.lineWidth = 0.001;
ctx.stroke();

for (const point of pointsB) {
  circle(point);
}

ctx.beginPath();
ctx.ellipse(...CENTER, r, r * 0.25, 0, 0, Math.PI);
ctx.strokeStyle = `rgba(127, 127, 127, 0.35)`;
ctx.lineWidth = 0.001;
ctx.stroke();

// for (let i = 0; i < 100000; i++) {
//   const point = CENTER.lineEnd(fxrand() * PI_2, Math.sqrt(fxrand()) * 0.4);
//   ctx.beginPath();
//   const r = (simplex.noise2D(...point.map(x => x * 4)) + 1) / 2;
//   const distortion = 0.2;
//   const middle = new Vec2(point.x, 0.5);
//   point.y += point.distance(...middle) * (point.y < 0.5 ? 1 : -1) * 0.5;
//   point.y -= r * distortion;
//   ctx.arc(...point, r ** 2 * 0.01, 0, PI_2);
//   ctx.fillStyle = `hsl(${r * 500}, 100%, 50%)`;
//   ctx.fill();
// }