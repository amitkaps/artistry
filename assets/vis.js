// Immutable Types
const FiniteNumberType = Symbol("FiniteNumber");
const PointType = Symbol("Point");
const SizeType = Symbol("Size");
const ColorType = Symbol("Color");
const ShapeType = Symbol("Shape");

// Type Checks
// Basic type check for Number (exclude INFINITY checks)
const isNumber = (x) =>
  typeof x === "number" && !Number.isNaN(x) ? true : false;

const getType = (x) => Object.getOwnPropertySymbols(x)[0];
const typeCheck = (fn, x) => fn(x);

// Shapes
const Size = (width = 100, height = 100) => {
  if (!isNumber(width)) throw TypeError("x must be a Number");
  if (!isNumber(height)) throw TypeError("y must be a Number");
  return {
    width: width,
    height: height,
    [SizeType]: "Size",
  };
};

const Point = (x = 0, y = 0) => {
  if (!isNumber(x)) throw TypeError("x must be a Number");
  if (!isNumber(x)) throw TypeError("y must be a Number");
  return {
    x: x,
    y: y,
    [PointType]: "Point",
  };
};

const Translate = (x, y) => {};

// Shape
const Circle = (center, size) => {
  if (center[PointType] !== "Point") throw TypeError("center must be a Point");
  if (size[SizeType] !== "Size") throw TypeError("size must be a Size");
  return {
    shape: "circle",
    center: center,
    size: size,
    [ShapeType]: "Circle",
  };
};

const Ellipse = (center, size) => {
  if (center[PointType] !== "Point") throw TypeError("center must be a Point");
  if (size[SizeType] !== "Size") throw TypeError("size must be a Size");
  return {
    shape: "ellipse",
    center: center,
    size: size,
    [ShapeType]: "Ellipse",
  };
};

const Rectangle = (center = Point(0, 0), size = Size(100, 100)) => {
  if (center[PointType] !== "Point") throw TypeError("center must be a Point");
  if (size[SizeType] !== "Size") throw TypeError("size must be a Size");
  return {
    shape: "rect",
    center: center,
    size: size,
    [ShapeType]: "Rectangle",
  };
};

const Line = (from, to) => {
  if (from[PointType] !== "Point") throw TypeError("from must be a Point");
  if (to[PointType] !== "Point") throw TypeError("to must be a Point");
  return {
    shape: "line",
    from: from,
    to: to,
    [ShapeType]: "Line",
  };
};

const Polyline = (...args) => {};

// Color

const Color = (name) => {
  if (typeof x !== "string") throw TypeError("x must be a color string");
  return {
    name: name,
    [ColorType]: "string",
  };
};

const Rgb = (r, g, b) => {
  if (typeof r !== "number") throw TypeError("r must be a Number");
  if (typeof g !== "number") throw TypeError("g must be a Number");
  if (typeof b !== "number") throw TypeError("b must be a Number");
  if (typeof a !== "number") throw TypeError("b must be a Number");
  return {
    red: r,
    green: g,
    blue: b,
    [ColorType]: "rgb",
  };
};

// Frame

const Frame = (size = {});

// shape to SVG Element
const shapeToSvgElement = (shape) => {
  switch (shape[ShapeType]) {
    case "Circle":
      return `<${shape.shape} cx="${shape.center.x}" cy="${shape.center.y}" 
      r="${shape.size.width}"/>`;
    case "Ellipse":
      return `<${shape.shape} cx="${shape.center.x}" cy="${shape.center.y}" 
      rx="${shape.size.width}" ry="${shape.size.height}"/>`;
    case "Rectangle":
      return `<${shape.shape} x="${shape.center.x}" y="${shape.center.y}" 
      width="${shape.size.width}" height="${shape.size.width}"/>`;
    case "Line":
      return `<${shape.shape} x="${shape.from.x}" y="${shape.from.y}" 
      x1="${shape.to.x}" y1="${shape.to.y}"/>`;
  }
};

//

// draw
const render = (shapes, id) => {
  // const svg = document.createElementNS("http://www.w3.org/2000/svg", svg);

  let svg = `<svg viewBox="0 0 300 300" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
          <g fill="grey" stroke-width="1" stroke="black">
          ${shapes.map(shapeToSvgElement).join("\n")}
          </g>
          </svg>`;
  const element = document.querySelector(id);
  element.innerHTML = svg;
};
