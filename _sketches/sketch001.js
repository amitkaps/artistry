// Data-Model

// Seed the number of parts to divide the space
const dimensions = 2; // No. of Dimensions (1 or 2)
const partitions = 4; // No. of Partitions (0, 1, 2, 3,...)
const parts = partitions ** dimensions;

// Functions to generate the data array
// From parts=16
//   to sequence=[0,1,2,...,15,16]
//   to randomSequence=[0,1,0, ...,0,1]
const sequence = (x) => [...Array(x).keys()];
const zeroOne = () => (Math.random() >= 0.5 ? 0 : 1);
const data = (x) => sequence(x).map(zeroOne);

// View-Render
const width = 400;
const height = 400;
const rectWidth = width / dimensions;
const rectHeight = height / dimensions;

const p = Point(1, 2);
const r = Rectangle(Point(1, 2), Size(200, 300));
console.log(r);
// Not Working
const shape = (x, y, w, h, f) => {
  return { rect: { x: x, y: y, w: w, h: h, fill: f } };
};
//const shapes = data(parts).map(rect(0, 0, rectWidth, rectHeight, 0))
//console.log(shapes);

// function renderSVG(id, width, height, data) {

//   svg = `<svg viewBox="0 0 ${width} ${height}">
//   ${data.map(d => svg`
//     <rect
//       x="${x(d.name)}"
//       y="${y(d.value)}"
//       height="${y(0) - y(d.value)}"
//       width="${x.bandwidth()}"></rect>
//   `)}

// }

// // Impure Function
// function render(canvasId, width, height) {
//   const canvas = document.querySelector("#sketch");
//   const context = canvas.getContext("2d");
//   const dpr = window.devicePixelRatio;
//   canvas.width = width * dpr;
//   canvas.height = height * dpr;
//   context.scale(scale, scale);
//   return context;
// }
