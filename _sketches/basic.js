// Shapes are made of Point and Other Parameters
const r1 = Rectangle(200, 200);
const r2 = Translate(100, 0)(r1);
console.log(r2);

//We can create a Group of Shapes
const shapes = Group(
  Rectangle(200, 200),
  Circle(80),
  Ellipse(150, 120),
  Hline(50),
  Vline(50)
);

// Draw the shapes
render(shapes, "#sketch");
