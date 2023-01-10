/**
 *
 * 顺序获取 promise 的 value
 *
 */
const p1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
};
const p2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
};
const p3 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    }, 1000);
  });
};

const list = [p1, p2, p3];

const handle1 = (list) => {
  list.reduce((prev, curr) => {
    return prev.then(curr).then((val) => {
      console.log(val);
    });
  }, Promise.resolve());
};

const handle2 = async (list) => {
  for (const getPromise of list) {
    console.log(await getPromise());
  }
};

const handle3 = async (list) => {
  while (list.length) {
    console.log(await list[0]());
    list.shift();
  }
};

console.log(handle1(list));
