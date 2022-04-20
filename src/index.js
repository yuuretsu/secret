import SimplexNoise from "simplex-noise";
import { Layer } from "./lib/layer";
import { normalise } from "./lib/math";
import { Vec2 } from "./lib/vec2";

const { PI } = Math;

const PI_2 = PI * 2;
const PI_HALF = PI / 2;


const simplex = new SimplexNoise();

const SCALE = 2000;

const CENTER = new Vec2(0.5, 0.5);

const { canvas, ctx } = new Layer(SCALE, SCALE);
document.body.appendChild(canvas);

ctx.scale(SCALE, SCALE);

const points = [...Array(5).keys()].map(() => CENTER.lineEnd(fxrand() * PI_2, 0.2));

ctx.lineWidth = 0.00001;

let t = 0;
void function loop() {
  requestAnimationFrame(loop);
  const rnd = sfc32(...hashes);
  // ctx.clearRect(0, 0, 1, 1);
  // for (const [x, y] of points) {
  //   ctx.beginPath();
  //   ctx.arc(x, y, 0.005, 0, PI_2);
  //   ctx.fill();
  // }



  for (let i = 0; i < 100; i++) {
    let pos = CENTER.lineEnd(fxrand() * PI_2, Math.sqrt(fxrand()) * 0.3);
    ctx.beginPath();
    ctx.moveTo(...pos);
    for (let j = 0; j < 100; j++) {
      const nearest = points.reduce((acc, cur) => acc.distance(...pos) < cur.distance(...pos) ? acc : cur);
      // const theta = pos.distance(...nearest) < 0.15
      //   ? nearest.angle(...pos) + PI_HALF
      //   : simplex.noise2D(...pos) * 1000;
      const theta = (5000 - normalise(-1, 1, simplex.noise2D(...pos)) * pos.distance(...nearest) * 5000) + j * 0.1;
      pos = pos.lineEnd(theta, 0.002);
      ctx.lineTo(...pos);
    }
    ctx.stroke();
  }
  t++;
}();
