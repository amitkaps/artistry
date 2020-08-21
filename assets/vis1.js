// Immutable Types
const FiniteNumberType = Symbol("FiniteNumber");
const Type = Symbol("Type");
const PointType = Symbol("Point");
const SizeType = Symbol("Size");
const ColorType = Symbol("Color");
const ShapeType = Symbol("Shape");
const TransformType = Symbol("Transfrom");

// Type Checks
// Basic type check for Number (exclude INFINITY checks)
const isNumber = (x) =>
  typeof x === "number" && !Number.isNaN(x) ? true : false;

const getType = (x) => x[Type].description;
const typeCheck = (fn, x) => fn(x);

// Shapes
const size = (width = 100, height = 100) => {
  if (!isNumber(width)) throw TypeError("x must be a Number");
  if (!isNumber(height)) throw TypeError("y must be a Number");
  return {
    width: width,
    height: height,
    [Type]: SizeType,
  };
};

const point = (x = 0, y = 0) => {
  if (!isNumber(x)) throw TypeError("x must be a Number");
  if (!isNumber(y)) throw TypeError("y must be a Number");
  return {
    point: [x, y],
    [Type]: PointType,
  };
};

const style = (fill, stroke, strokeWidth) => {};

// defined by [a  c  e
//             b  d  f
//             0  0  1 ]
const matrix = (m = [1, 0, 0, 1, 0, 0]) => {
  return {
    matrix: m,
    [Type]: TransformType,
  };
};

const transform()

const translate = (x, y) => transform([1, 0, 0, 1, x, y]);
const translateX = (x) => transform([1, 0, 0, 1, x, 0]);
const translateY = (x) => transform([1, 0, 0, 1, 0, y]);
const scale = (x, y) => transform([x, 0, 0, 1, 0, 0]);
const scaleX = (x) => transform([x, 0, 0, y, 1, 0]);
const scaleY = (y) => transform([x, 0, 0, 1, 0, 0]);
const skew = (x, y) => transform([1, y, x, 1, 0, 0]);
const skewX = (x) => transform([1, 0, x, 1, 0, 0]);
const skewY = (y) => transform([1, y, 0, 1, 0, 0]);
const rotate = (a) => transform()



// Shapes
const circle = (center, size, style) => {
  if (center[Type] !== PointType) throw TypeError("center must be a Point");
  if (size[Type] !== SizeType) throw TypeError("size must be a Size");
  return {
    shape: "circle",
    center: center,
    size: size,
    [Type]: ShapeType,
  };
};

const ellipse = (center, size, style) => {
  if (center[Type] !== PointType) throw TypeError("center must be a Point");
  if (size[Type] !== SizeType) throw TypeError("size must be a Size");
  return {
    shape: "ellipse",
    center: center,
    size: size,
    [Type]: ShapeType,
  };
};

const rectangle = (
  center = point(0, 0),
  size = size(100, 100),
  style,
  transform
) => {
  if (center[Type] !== PointType) throw TypeError("center must be a Point");
  if (size[Type] !== SizeType) throw TypeError("size must be a Size");
  return {
    shape: "rect",
    center: center,
    size: size,
    style: style,
    [Type]: ShapeType,
  };
};

// line :: [Point, Point] -> Shape
const line = (from, to, style, transform ) => {
  if (from[Type] !== PointType) throw TypeError("from must be a Point");
  if (to[Type] !== PointType) throw TypeError("to must be a Point");
  return {
    shape: "line",
    points: [from.point, to.point],
    style: style,
    transform: ;
    [Type]: ShapeType,
  };
};

// polyline :: List[Point] -> Shape
const polyline = (points, style) => {
  return {
    shape: "polyline",
    points: [...points],
    style: style,
    [Type]: ShapeType,
  };
};

// polygon :: List[Point] -> Shape
const polygon = (points, style) => {
  return {
    shape: "polygon",
    points: [...points],
    style: style,
    [Type]: ShapeType,
  };
};

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
function curry(fn) {
  const arity = fn.length;
  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }
    return fn.call(null, ...args);
  };
}

// compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
const compose = (...fns) => (...args) =>
  fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// map :: Functor f => (a -> b) -> f a -> f b
const map = curry((fn, f) => f.map(fn));

// Unary takes a function and makes it ignore everything
// except the first argument.
// unary :: ((a, b, ...) -> c) -> a -> c
function unary(f) {
  return (x) => f(x);
}

// The List implementation itself.
const List = {
  // map :: (a -> b) -> List a -> List b
  map: curry(function map(f, xs) {
    return xs.map(unary(f));
  }),

  // chain :: (a -> List b) -> List a -> List b
  chain: curry(function chain(f, xs) {
    return xs.flatMap(unary(f));
  }),

  // ap :: List (a -> b) -> List a -> List b
  ap: curry(function ap(fs, xs) {
    return List.chain((f) => List.map(f, xs), fs);
  }),

  // reduce :: (a -> b -> a) -> a -> List b -> a
  reduce: curry(function reduce(f, a, xs) {
    return xs.reduce(f, a);
  }),
};
// //
// - Either (Right, Left)
// - Maybe (Yes, Null)

// Rectangle ( Point, Size, Style)
// Default Values?

// Frame -> 300, 300 ->

// Point( CenterX, CenterY )

// Rectangle(0,0)

// Rectangle = Point Size Style

// Style - FillColor, StrokeColor, Opacity, stroke-width

// function Rectangle (x, y, w, h) {
//   return ...}

// RectangleFromCorners = (x1, y1, x2, y2) =>  { return ...}

// Rectangle.FromCenter(x1, y1, w, h)

// const Rectangle = {

//   FromCorner:

//   FromCenter:

// }
// Color

// Reactive Variable

const Color = (name) => {
  if (typeof x !== "string") throw TypeError("x must be a color string");
  return {
    name: name,
    [Type]: ColorType,
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
    [Type]: ColorType,
  };
};

// Frame

//const Frame = (size = {});

// shape to SVG Element
const shapeToSvgElement = (s) => {
  switch (s.shape) {
    case "circle":
      return `<${s.shape} cx="${s.center.point[0]}" cy="${s.center.point[1]}" 
      r="${s.size.width}"/>`;
    case "ellipse":
      return `<${s.shape} cx="${s.center.point[0]}" cy="${s.center.point[1]}" 
      rx="${s.size.width}" ry="${s.size.height}"/>`;
    case "rect":
      return `<${s.shape} x="${s.center.point[0]}" y="${s.center.point[1]}" 
      width="${s.size.width}" height="${s.size.width}"/>`;
    case "line":
      return `<${s.shape} x="${s.points[0][0]}" y="${s.points[0][1]}" 
      x1="${s.points[1][0]}" y1="${s.points[1][1]}"/>`;
    case "polyline":
      return `<${s.shape} points="${s.points}"`;
  }
};

// draw
const render = (shapes, id) => {
  // const svg = document.createElementNS("http://www.w3.org/2000/svg", svg);
  console.log(shapes.map(shapeToSvgElement).join("\n"));

  let svg = `<svg viewBox="0 0 300 300" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
          <g fill="grey" stroke-width="1" stroke="black">
          ${shapes.map(shapeToSvgElement).join("\n")}
          </g>
          </svg>`;
  const element = document.querySelector(id);
  element.innerHTML = svg;
};
