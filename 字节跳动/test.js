/**
 *
 * 1、输出下面结果
 *
 */
title = 'a';
const obj = {
  title: 'b',
  fn1: function () {
    console.log(this, this.title);
  },
  fn2: () => {
    console.log(this, this.title);
  },
};

const fn1 = obj.fn1;
const fn2 = obj.fn2;

// fn1();
// fn2();
// obj.fn1();
// obj.fn2();

/**
 *
 * 2、手写 call apply bind
 *
 */
const target = { x: 100 };

function fn(a, b, c) {
  console.log('fn', a + b + c, this.x);
}

/**
 *
 * 实现 call apply
 *
 */
Function.prototype.myCall = function (target, ...args) {
  target = !!target ? target : global;
  const fn = Symbol();
  target[fn] = this;
  const res = target[fn](...args);
  delete target[fn];

  return res;
};
fn.myCall(target, 1, 2, 3);

Function.prototype.myApply = function (target, argsList) {
  target = !!target ? target : {};
  argsList = Array.isArray(argsList) ? argsList : [];

  const fn = Symbol();
  target[fn] = this;

  const res = target[fn](...argsList);
  delete target[fn];

  return res;
};
fn.myApply(target, [1, 2, 3]);

/**
 *
 * 实现 bind 方法
 *
 */
Function.prototype.myBind = function (target, ...args) {
  const fn = this;

  const boundFn = function (...otherArgs) {
    const finalArgs = [...args, ...otherArgs];
    const isNew = this instanceof boundFn;

    return fn.myApply(isNew ? this : target, finalArgs);
  };
  boundFn.prototype = fn.prototype;

  // const boundFn = function (...otherArgs) {
  //   const finalArgs = [...args, ...otherArgs];
  //   const isNew = this instanceof boundFn;
  //   if (isNew) {
  //     return new fn(...finalArgs);
  //   }
  //   return fn.myApply(target, finalArgs);
  // };

  return boundFn;
};

const newFn = fn.myBind(target, 1, 2, 3);
newFn();
console.log(new newFn());
