const getProp = (target, keys, defaultVal) => {
  if (!keys.length) return defaultVal;

  const [first, ...other] = keys;

  if (target[first]) {
    if (!other.length) {
      return target[first];
    } else {
      return getProp(target[first], other, defaultVal);
    }
  } else {
    return defaultVal;
  }
};

const obj = {
  a: {
    b: {
      c: {
        d: 2,
      },
    },
  },
};

const newGetProp = (target, keys, defaultVal) =>
  keys.reduce((res, key) => res[key] || defaultVal, target);

console.log(newGetProp(obj, ['a', 'bm', 'c', 'd'], 10));
