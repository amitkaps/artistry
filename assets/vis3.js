// Shapes
const Type = Symbol("Type");
const ShapeType = Symbol("Shape");
const Point = (x, y) => new DOMPointReadOnly(x, y);
const Matrix = (m) => new DOMMatrixReadOnly(m);

// Type System
// Shape = Polyline [Point]
//       | Ellipse Point, Int, Int
//       | Transform Shape
//       | Group [Shape]
//       | Colored Shape Color

// Arc: [Point] Radius StartAngle EndAngle Direction -> Shape

// Ellipse:: Point Width Height -> Shape
const Ellipse = (center, raidusX, raidusY) => {
  return {
    points: [center],
    raidusX: raidusX,
    raidusY: raidusY,
    geometry: "ellipse",
    [Type]: ShapeType,
  };
};

// Circle:: Point Radius -> Shape
const Circle = (center, raidus) => {
  return {
    points: [center],
    raidus: raidus,
    geometry: "circle",
    [Type]: ShapeType,
  };
};

// Polyline:: [Point] -> Shape
const Polyline = (...points) => {
  return {
    points: [...points],
    geometry: "polyline",
    [Type]: ShapeType,
  };
};

// Line:: Point Point -> Shape
const Line = (from, to) => {
  return {
    points: [from, to],
    geometry: "line",
    [Type]: ShapeType,
  };
};

// Polyline:: [Point] -> Shape
const Polygon = (...points) => {
  return {
    points: [...points],
    geometry: "polygon",
    [Type]: ShapeType,
  };
};

// Rect:: Point Width Height -> Shape
const Rectangle = (center, width, height) => {
  return {
    points: [center],
    width: width,
    height: height,
    geometry: "rect",
    [Type]: ShapeType,
  };
};

// Group:: [Shape] -> Shapes
const Group = (...shapes) => {
  return {
    shapes: [...shapes],
    geometry: "group",
    [Type]: ShapeType,
  };
};

// Transform: Shape Matrix -> Shape
const Transform = (matrix) => (shape) => {
  // DOMMatrixReadOnly.multiply();
  return {
    shapes: shapes,
    matrix: matrix,
    geometry: "transform",
    [Type]: ShapeType,
  };
};

const Translate = (x, y) => Transform(new DOMMatrixReadOnly().translate(x, y));
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
const _stringify = (pts) => pts.map((p) => `${p.x},${p.y}`).join(" ");

// shape to SVG Element
const _toSvgTree = (s) => {
  console.log(s);
  switch (s.geometry) {
    case "group":
      return `<g> ${s.shapes.map(_toSvgTree).join("\n")} </g>`;
    case "ellipse":
      return `<${s.geometry} cx="${s.points[0].x}" cy="${s.points[0].y}"
            rx="${s.raidusX}" ry="${s.raidusY}"/>`;
    case "circle":
      return `<${s.geometry} cx="${s.points[0].x}" cy="${s.points[0].y}" 
            r="${s.raidus}"/>`;
    case "polyline":
      return `<${s.geometry} points="${_stringify(s.points)}"/>`;
    case "line":
      return `<${s.geometry} x1="${s.points[0].x}" y1="${s.points[0].y}" 
      x2="${s.points[1].x}" y2="${s.points[1].y}"/>`;
    case "polygon":
      return `<${s.geometry} points="${_stringify(s.points)}"/>`;
    case "rect":
      return `<${s.geometry} x="${s.points[0].x}" y="${s.points[0].y}" 
      width="${s.width}" height="${s.width}"/>`;
    case "transform":
      return;
  }
};

// draw
const render = (shapes, id) => {
  // const svg = document.createElementNS("http://www.w3.org/2000/svg", svg);
  //console.log(shapes.map(toSvgTree).join("\n"));

  let svg = `<svg width="400" height="400" style="background: black" 
  xmlns="http://www.w3.org/2000/svg">
          <g fill="white" stroke-width="1" stroke="white">
          ${_toSvgTree(shapes)}
          </g>
          </svg>`;
  const element = document.querySelector(id);
  element.innerHTML = svg;
};
