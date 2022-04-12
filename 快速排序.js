const sort = (list) => {
  if (list.length <= 1) return list;

  const left = [];
  const right = [];
  const mid = list.splice(list.length >> 1, 1)[0];

  for (let i = 0; i <= list.length - 1; i++) {
    if (list[i] > mid) {
      right.push(list[i]);
    } else {
      left.push(list[i]);
    }
  }

  return [...sort(left), mid, ...sort(right)];
};

const list = [1, 5, 3, 7, 9, 2];
console.log(sort(list));
