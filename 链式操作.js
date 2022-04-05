// 实现一个 query 方法，实现对数据的链式查询和处理

// query 传入参数为原始数据（数组格式，每个元素都是对象）
// 通过进行链式调用对数据执行操作，支持的方法有
//    where(predicate): 根据参数的条件进行筛选，参数与 [].filter 的参数类似
//    orderBy(key, desc): 根据 key 的值进行排列，默认升序排列，当第二个参数为 true 时降序排列
//    groupBy(key): 根据 key 的值对数据元素进行分组，合并为二维数组
//    execute(): 执行所有处理并返回最终结果
// 执行 execute 方法时才真正执行操作并返回结果
// 请结合下面示例理解需求

const data = [
  { name: 'foo', age: 16, city: 'shanghai' },
  { name: 'bar', age: 24, city: 'hangzhou' },
  { name: 'fiz', age: 22, city: 'shanghai' },
  { name: 'baz', age: 19, city: 'hangzhou' },
];

console.log(
  query(data)
    .where((item) => item.age > 18)
    .orderBy('name')
    .groupBy('city')
    .execute()
);

// // 结果返回
// [
//   [
//     { name: 'baz', age: 19, city: 'hangzhou' },
//     { name: 'bar', age: 24, city: 'hangzhou' },
//   ],
//   [
//     { name: 'fiz', age: 22, city: 'shanghai' },
//   ]
// ]

function query(data) {
  let res = [];

  const action = {
    where(predicate) {
      data.forEach((item) => {
        if (predicate(item)) {
          res.push(item);
        }
      });

      return action;
    },

    orderBy(key, isDesc = false) {
      const compare = (x, y) => {
        if (x[key] < y[key]) {
          return -1;
        } else if (x[key] > y[key]) {
          return 1;
        } else {
          return 0;
        }
      };
      res.sort(compare);

      return action;
    },

    groupBy(key) {
      const temp = {};
      res.forEach((item) => {
        if (temp[item[key]]) {
          temp[item[key]].push(item);
        } else {
          temp[item[key]] = [item];
        }

        res = Object.values(temp);
      });

      return action;
    },

    execute() {
      return res;
    },
  };

  return action;
}
