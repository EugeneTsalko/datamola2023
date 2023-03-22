const add = (arg1, arg2) => (arg2 !== undefined ? arg1 + arg2 : (value) => value + arg1);

const sub = (arg1, arg2) => (arg2 !== undefined ? arg1 - arg2 : (value) => value - arg1);

const mul = (arg1, arg2) => (arg2 !== undefined ? arg1 * arg2 : (value) => value * arg1);

const div = (arg1, arg2) => (arg2 !== undefined ? arg1 / arg2 : (value) => value / arg1);

function pipe(...args) {
  return (value) => args.reduce((acc, curr) => curr(acc), value);
}

// // test-cases

// // add

// const sum = add(42, 42);
// console.log('simple sum: ', sum);

// const add1 = add(1);
// const curryedSum = add1(41);
// console.log('curryed sum: ', curryedSum);

// // div

// const simpleSub = sub(84, 42);
// console.log('simple sub: ', simpleSub);

// const sub2 = sub(2);
// const curryedSub = sub2(15);
// console.log('curryed sub: ', curryedSub);

// // mul

// const simpleMul = mul(10, 5);
// console.log('simple mul: ', simpleMul);

// const mul3 = mul(3);
// const curryedMul = mul3(7);
// console.log('curryed mul: ', curryedMul);

// div;

// const simpleDiv = div(44, 2);
// console.log('simple div: ', simpleDiv);

// const div4 = div(4);
// const curryedDiv = div4(360);
// console.log('curryed div: ', curryedDiv);

// // тест кейсы из ДЗ

// let a = add(1, 2);
// console.log('a: ', a);

// let b = mul(a, 10);
// console.log('b: ', b);

// let sub1 = sub(1);

// let c = sub1(b);
// console.log('c: ', c);

// let d = mul(sub(a, 1))(c);
// console.log('d: ', d);

// let doSmth = pipe(add(d), sub(c), mul(b), div(a));
// let result = doSmth(0);
// console.log('result: ', result);

// let x = pipe(add(1), mul(2))(3);
// console.log('x: ', x);
