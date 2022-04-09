// 相邻且相等，则消除
// [7, 6, 6, 6, 7, 6, 4]
// [6, 4]

const equal = (list) => {
  const stack = [];
  let repeat = 0;

  for (let i = 0; i < list.length; i++) {
    const curr = list[i];

    if (stack[stack.length - 1] !== curr && repeat) {
      repeat++;

      while (repeat) {
        stack.pop();
        repeat--;
      }
    }

    if (stack[stack.length - 1] === curr) {
      repeat++;
    }

    stack.push(curr);
  }

  return stack;
};

console.log(equal([7, 6, 6, 5, 5, 6, 7, 6, 4]));
