// Shapes
const Type = Symbol("Type");
const ShapeType = Symbol("Shape");
const config = Object.freeze({
  width: 400,
  height: 400,
});

const Point = (x, y) => new Array(x, y);
const Matrix = (a, b, c, d, e, f) => new Array(a, b, c, d, e, f);

// Type System
// Shape = Polyline [Point]
//       | Ellipse Point, Int, Int
//       | Transform Shape
//       | Group [Shape]
//       | Colored Shape Color

// Arc: [Point] Radius StartAngle EndAngle Direction -> Shape

const Shape = (
  geometry,
  points,
  width,
  height,
  center = Point(0, 0),
  transform = Matrix(1, 0, 0, 1, 0, 0)
) => {
  return {
    geometry: geometry,
    points: points,
    width: width || 0,
    height: height || 0,
    center: center,
    transform: transform,
    [Type]: ShapeType,
  };
};
// Ellipse:: Float Float -> Shape
const Ellipse = (width, height) => Shape("ellipse", [], width, height);

// Circle:: Float -> Shape
const Circle = (diameter) => Shape("circle", [], diameter, diameter);

// Polyline:: List Point -> Shape
const Polyline = (...points) => Shape("polyline", [...points]);

// Line:: Point Point -> Shape
const Line = (from, to) =>
  Shape(
    "line",
    [from, to],
    to.x - from.x,
    to.y - from.x,
    Point((to.x - from.x) / 2, (to.y - from.x) / 2)
  );

// Hline:: Float -> Shape
const Hline = (length) =>
  Shape("line", [Point(-length / 2, 0), Point(length / 2, 0)], 0, length);

// Vline:: Float -> Shape
const Vline = (length) =>
  Shape("line", [Point(0, -length / 2), Point(0, length / 2)], length, 0);

// Polyline:: List Point -> Shape
const Polygon = (...points) => Shape("polygon", [...points]);

// Rect::  Float Float -> Shape
const Rectangle = (width = 100, height = 50) =>
  Shape(
    "rect",
    [
      Point(-width / 2, -height / 2),
      Point(width / 2, -height / 2),
      Point(width / 2, +height / 2),
      Point(-width / 2, height / 2),
    ],
    width,
    height,
    Point(-width / 2, -height / 2)
  );

// Square::  Float -> Shape
const Squate = (length) => Rectangle(length, length);

const Ngon = (sides, length) => Shape("polygon", [...points]);

// Group:: List Shape -> Shapes
const Group = (...shapes) => {
  return {
    shapes: [...shapes],
    geometry: "group",
    [Type]: ShapeType,
  };
};

// Transform:  Matrix Shape -> Shape
const Transform = (matrix) => (...shapes) => {
  return {
    shapes: [...shapes],
    matrix: matrix,
    geometry: "transform",
    [Type]: ShapeType,
  };
};

const Translate = (x, y) => Transform(Matrix(1, 0, 0, 1, x, y));
//const translate = (x, y) => transform(mTranslate(x, y));
// const translateX = (x) => transform(mTranslate(x, 0));
// const translateY = (x) => transform(mTranslate(0, x));
// const scale = (x, y) => transform(mScale(x, y));
// const scaleX = (x) => transform(mScale(x, 1));
// const scaleY = (y) => transform(mScale(1, y));
// const skew = (x, y) => transform(mSkew(x, y));
// const skewX = (x) => transform(mSkew(x, 0));
// const skewY = (y) => transform(mSkew(0, y));
// const rotate = (a) => transform();

//Get String
const _sPoints = (pts) => pts.map((p) => `${p[0]},${p[1]}`).join(" ");
const _sMatrix = (matrix) => `"matrix(${matrix.join(" ")})"`;
// shape to SVG Element
const _toSvgTree = (s) => {
  console.log(s);
  switch (s.geometry) {
    case "group":
      return `<g> ${s.shapes.map(_toSvgTree).join("\n")} </g>`;
    case "ellipse":
      return `<${s.geometry} cx="${s.center[0]}" cy="${s.center[1]}"
            rx="${s.width / 2}" ry="${s.height / 2}"/>`;
    case "circle":
      return `<${s.geometry} cx="${s.center[0]}" cy="${s.center[1]}" 
            r="${s.width / 2}"/>`;
    case "polyline":
      return `<${s.geometry} points="${_sPoints(s.points)}"/>`;
    case "line":
      return `<${s.geometry} x1="${s.points[0][0]}" y1="${s.points[0][1]}" 
      x2="${s.points[1][0]}" y2="${s.points[1][1]}"/>`;
    case "polygon":
      return `<${s.geometry} points="${_sPoints(s.points)}"/>`;
    case "rect":
      return `<${s.geometry} x="${s.center[0]}" y="${s.center[1]}" 
      width="${s.width}" height="${s.height}"/>`;
    case "transform":
      return `<g transform=${_sMatrix(s.matrix)}> ${s.shapes
        .map(_toSvgTree)
        .join("\n")} </g>`;
  }
};

// draw
const render = (shapes, id) => {
  const svgNS = "http://www.w3.org/2000/svg";
  const height = "100%";
  const width = "100%";
  // const svg = document.createElementNS("http://www.w3.org/2000/svg", svg);
  let svg = `<svg viewbox="0 0 400 400" width=${width} height=${height} xmlns="${svgNS}" style="background-color: black">
          <g stroke-width="1" stroke="white" fill="transparent"
          transform="translate(200 200)">
          ${_toSvgTree(shapes)}
          </g>
          </svg>`;
  const element = document.querySelector(id);
  element.innerHTML = svg;
};
