
function diagonalA(x, y, w, h) {
    line(x, y, x+w, y+h);
}

function diagonalB(x, y, w, h) {
    line(x+w, y, x, y+h);
}

const tile = tessalate(grid, 5);
const shape = tile(oneOf(diagonalA, diagonalB));
render(shape);

