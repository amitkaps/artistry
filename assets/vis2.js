// Shapes
const size = (w = 100, h = 100) => [w, h];
const point = (x = 0, y = 0) => [x, y];

const shape = (pts, type, transform) => {
  return { points: pts, type: type, transform: transform };
};

// Type System
// Shape = Polyline [Point]
//       | Ellipse Point, Int, Int
//       | Transform Shape
//       | Group [Shape]
//       | Colored Shape Color
//
// Render =  SceneGraph Shape
//         | SVGString Shape
//         | Canvas Shape
//         | WebGl
//

// Attributed -> Color -> Fill, Stroke
// Patterns -> Repetitions -> Shape (Rect - Grid Repeat), Fill
// Interaction

// function scale(shape, x, y)  {
//   return {type: "scale", x: x, y: y, shape: shape}
// }

// function render(shape) {
//   if (shape.type == "polyline")
// }

// function rnderWithTransform(shape, t) {
//   if (shape.type == "polyline")
//     ...
//   if (shape.type == "transform") {
//     renderwithTransform(shape.shape, combineTransform(t, shape.transform))
//  }
// }

// Open
const polyline = (pts) => shape(pts, "polyline", mIdentity);

const line = (x1, y1, x2, y2) => polyline([point(x1, y1), point(x2, y2)]);

const polygon = (pts) => shape(pts, "polygon", mIdentity);
const rectangle = (x, y, w, h) =>
  polygon([
    point(x - w / 2, y - h / 2),
    point(x + w / 2, y - h / 2),
    point(x + w / 2, y + h / 2),
    point(x - w / 2, y + h / 2),
  ]);

const ellipse = (pts) => shape(pts, "ellipse", mIdentity);

const circle = (x, y, r) => ellipse(x, y, r, r);

// defined by [a  c  e
//             b  d  f
//             0  0  1 ]

const mIdentity = [1, 0, 0, 1, 0, 0];
const mTranslate = (x, y) => [1, 0, 0, 1, x, y];
const mScale = (x, y) => [x, 0, 0, y, 0, 0];
const mSkew = (x, y) => [1, y, x, 1, 0, 0];

const mul32 = (m, p) => [
  m[0] * p[0] + m[2] * p[0] + m[4],
  m[1] * p[1] + m[3] * p[1] + m[5],
];

// defined by [m0  m2  m4   [n0  n2  n4
//             m1  m3  m5    n1  n3  n5
//             0    0   1 ]   0   0   1 ]

const mul33 = (m, n) => {
  l = [
    m[0] * n[0] + m[2] * n[1],
    m[1] * n[0] + m[3] * n[1],
    m[0] * n[2] + m[2] * n[3],
    m[1] * n[2] + m[3] * n[3],
    m[0] * n[4] + m[2] * n[5],
    m[1] * n[4] + m[3] * n[5],
  ];
  console.log(l);
  return l;
};

const transform = (m) => (shape) => {
  let t = shape.transform;
  console.log(m, t);
  let type = shape.type;
  let tnew = mul33(m, t);
  //console.log(tnew);
  return tnew;
};

const translate = (x, y) => transform(mTranslate(x, y));
const translateX = (x) => transform(mTranslate(x, 0));
const translateY = (x) => transform(mTranslate(0, x));
const scale = (x, y) => transform(mScale(x, y));
const scaleX = (x) => transform(mScale(x, 1));
const scaleY = (y) => transform(mScale(1, y));
const skew = (x, y) => transform(mSkew(x, y));
const skewX = (x) => transform(mSkew(x, 0));
const skewY = (y) => transform(mSkew(0, y));
const rotate = (a) => transform();

//Get String
const stringify = (arr) => arr.map((a) => a.join(",")).join(" ");

// shape to SVG Element
const shapeToSvgElement = (s) => {
  switch (s.type) {
    case "circle":
      return `<${s.shape} cx="${s.center.point[0]}" cy="${s.center.point[1]}" 
      r="${s.size.width}"/>`;
    case "ellipse":
      return `<${s.shape} cx="${s.center.point[0]}" cy="${s.center.point[1]}" 
      rx="${s.size.width}" ry="${s.size.height}"/>`;
    case "polygon":
      return `<${s.type} points="${stringify(s.points)}"/>`;
    case "polyline":
      return `<${s.type} points="${stringify(s.points)}"/>`;
  }
};

// draw
const render = (shapes, id) => {
  // const svg = document.createElementNS("http://www.w3.org/2000/svg", svg);
  console.log(shapes.map(shapeToSvgElement).join("\n"));

  let svg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"
  style="background: black">
          <g fill="white" stroke-width="1" stroke="white">
          ${shapes.map(shapeToSvgElement).join("\n")}
          </g>
          </svg>`;
  const element = document.querySelector(id);
  element.innerHTML = svg;
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
