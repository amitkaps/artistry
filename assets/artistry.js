class Sketch {
    constructor(selector) {
        this.selector = selector;
        this._canvas = null;
        this._ctx = null;

    }

    init() {
        if (this._ctx === null) {
            this._canvas = document.querySelector(this.selector);
            this._ctx = this._canvas.getContext('2d');
        }
    }

    get ctx() {
        this.init();
        return this._ctx;
    }

    get width() {
        this.init();
        return this._canvas.width;
    }
    get height() {
        this.init();
        return this._canvas.height;
    }

    line(x1, y1, x2, y2) {
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    rect(x, y, w, h) {
        this.ctx.strokeRect(x, y, w, h)
    }
}

var s = new Sketch("canvas");

function line(x1, y1, x2, y2) {
    s.line(x1, y1, x2, y2);
}

function rect(x, y, w, h) {
    s.rect(x, y, w, h);
}

function oneOf(shape1, shape2) {
    return function (x, y, w, h) {
        const shape = Math.random() < 0.5 ? shape1 : shape2;
        shape(x, y, w, h);
    }
}

function above(a, b) {
    return function(x, y, w, h) {
        // s.ctx.strokeStyle = "blue";
        // line(x, y+h/2, x+w, y+h/2)
        // s.ctx.strokeStyle = "black";
        a(x, y, w, h/2);
        b(x, y+h/2, w, h/2);
    }
}

function beside(a, b) {
    return function(x, y, w, h) {
        a(x, y, w/2, h);
        b(x+w/2, y, w/2, h);
    }
}

function repeat_above(shape) {
    return above(shape, shape);
}
function repeat_beside(shape) {
    return beside(shape, shape);
}

function grid(shape) {
    return repeat_above(repeat_beside(shape));
}

function tessalate(tile, depth) {
    if (depth == 1) {
        return tile;
    }
    else {
        return compose(tile, tessalate(tile, depth-1))
    }
}

function compose(f, g) {
    return (...args) => f(g(...args));
}

function render(shape) {
    shape(0, 0, s.width, s.height);
}