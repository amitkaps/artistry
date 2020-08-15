// We use Point for location (x, y)
const point = Point(0, 0);

// We use Size for a box size of (width, height)
const size = Size(50, 50);

// Shapes are made of Point and Size
const l1 = Line(Point(0, 20), Point(100, 20));
const r1 = Rectangle(Point(80, 80), Size(50, 50));
const e1 = Ellipse(Point(100, 200), Size(50, 60));
const c1 = Circle(Point(50, 50), Size(30, 30));

//We can create a List of Shapes
const shapes = [r1, l1, e1, c1];
console.log(shapes);

// Draw the shapes
render(shapes, "#sketch");
