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
