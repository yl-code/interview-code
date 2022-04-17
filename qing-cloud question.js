/**
 *
 * 统计字符串中出现次数最多的字母
 *
 */
const str1 = 'abbcccdddd'; // { d: 4 }
const str2 = 'aaaabbcccc'; // { a: 4, c: 4 }

const getCount = (str) => {
  const res = {};

  str.split('').forEach((char) => {
    if (res[char]) {
      res[char]++;
    } else {
      res[char] = 1;
    }
  });

  const max = Math.max(...Object.values(res));
  const data = {};
  Object.keys(res).forEach((key) => {
    if (res[key] === max) {
      data[key] = max;
    }
  });

  return data;
};

// console.log(getCount(str2));

/**
 *
 * aaabbccdddaa => 3a2b2c3d2a
 *
 * 统计字符串中的字母数量
 */

const getStr = (str) => {
  let charList = [];
  let res = '';

  str.split('').forEach((char) => {
    if (charList[charList.length - 1] === char || !charList.length) {
      charList.push(char);
    } else {
      res += `${charList.length}${charList[0]}`;
      charList = [];
      charList.push(char);
    }
  });

  if (charList.length) {
    res += `${charList.length}${charList[0]}`;
  }

  return res;
};
// console.log(getStr('aaabbccdddaa'));

/**
 *
 * 数组转树
 *
 */
const list = [
  { id: '1', title: 'node 1' },
  { id: '2', title: 'node 2' },
  { id: '1-1', title: 'node 1-1', parentId: '1' },
  { id: '1-2', title: 'node 1-2', parentId: '1' },
  { id: '2-1', title: 'node 2-1', parentId: '2' },
  { id: '1-1-1', title: 'node 1-1-1', parentId: '1-1' },
  { id: '1-1-2', title: 'node 1-1-2', parentId: '1-1' },
  { id: '1-1-3', title: 'node 1-1-3', parentId: '1-1' },
  { id: '1-2-1', title: 'node 1-2-1', parentId: '1-2' },
  { id: '1-2-2', title: 'node 1-2-2', parentId: '1-2' },
];

const getFather = (dict, keys) => {
  if (keys.length === 1) {
    return dict[keys[0]];
  }
  return getFather(dict[keys[0]].children, keys.slice(1));
};

const getKeys = (id) => {
  const keys = id.split('-');
  const newKeys = [];

  keys.forEach((key) => {
    newKeys.push([...newKeys, key].join('-'));
  });

  return newKeys;
};

const getTree = (list) => {
  const res = {};

  list.forEach((item) => {
    if (item.parentId) {
      const keys = getKeys(item.parentId);

      const father = getFather(res, keys);

      if (!father) {
        console.log(keys, res, item);
      }

      if (father.children) {
        father.children[item.id] = { id: item.id, title: item.title };
      } else {
        father.children = {
          [item.id]: { id: item.id, title: item.title },
        };
      }
    } else {
      res[item.id] = item;
    }
  });
  return res;
};

// console.log(getTree(list));

/**
 *
 * 树转列表
 *
 */
const tree = [
  {
    id: '1',
    title: 'node 1',
    children: [
      {
        id: '1-1',
        title: 'node 1-1',
        children: [
          {
            id: '1-1-1',
            title: 'node 1-1-1',
          },
          {
            id: '1-1-2',
            title: 'node 1-1-2',
          },
          {
            id: '1-1-3',
            title: 'node 1-1-3',
          },
        ],
      },
      {
        id: '1-2',
        title: 'node 1-2',
        children: [
          {
            id: '1-2-1',
            title: 'node 1-2-1',
          },
          {
            id: '1-2-2',
            title: 'node 1-2-2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'node 2',
    children: [
      {
        id: '2-1',
        title: 'node 2-1',
      },
    ],
  },
];

const getList = (list, tree, parentId) => {
  tree.forEach(({ id, title, children }) => {
    const node = { id, title };

    if (parentId) {
      node.parentId = parentId;
    }

    list.push(node);

    if (Array.isArray(children)) {
      getList(list, children, id);
    }
  });

  return list;
};

const data = [];
// console.log(getList(data, tree));

/**
 *
 * 实现 promise 静态方法
 *
 */
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});

Promise.slow = (list) => {
  return new Promise((resolve) => {
    let count = list.length;

    list.forEach((item) => {
      item.then((value) => {
        if (count === 1) {
          resolve(value);
        } else {
          count--;
        }
      });
    });
  });
};

Promise.fast = (list) => {
  return new Promise((resolve) => {
    let done = false;

    list.forEach((item) => {
      item.then((value) => {
        if (!done) {
          resolve(value);
          done = true;
        }
      });
    });
  });
};

// console.log(
//   Promise.fast([p1, p2]).then((value) => {
//     console.log(value);
//   })
// );

console.log(
  Promise.slow([p1, p2]).then((value) => {
    console.log(value);
  })
);
