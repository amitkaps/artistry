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

const r1 = Rectangle(width / parts, height / parts);
const r2 = Translate(20, 30)(r1);

const shapes = Group(r1, r2);

render(shapes, "#sketch");
