// We use Point for location (x, y)
const p = point(0, 0);

// We use Size for a box size of (width, height)
const s = size(50, 50);

// Shapes are made of Point and Size
const l1 = line(0, 20, 100, 20);
const r1 = rectangle(80, 80, 50, 50);
// const e1 = ellipse(point(100, 200), size(50, 60));
// const c1 = circle(point(50, 50), size(30, 30));

const p2 = point();

const r2 = translate(10, 10)(r1);
console.log(r2);
// rot(shape) -> rotate 90deg
// rotate(shape, 90)

//We can create a List of Shapes
const shapes = [r1, l1, r2];

console.log(shapes);

// Draw the shapes
render(shapes, "#sketch");
