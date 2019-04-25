import { curry } from './curry'

// #region curry

// #endregion

const _compose = (fn1, fn2) => {
  return function (...args) {
    const res = curry(fn1, ...args)
    // 如果这个函数的参数不足，则返回它
    // @ts-ignore
    if (res instanceof Function && res._curry === true) {
      return _compose(res, fn2)
    }
    return curry(fn2, res)
  }
}

/**
 * 将多个函数组合起来
 * 前面函数的返回值将变成后面函数的第一个参数，如果到了最后一个函数执行完成，则直接返回
 * 该函数是自动柯里化，将对所有传入的函数进行柯里化处理
 * @param  {...Function} fns 多个需要连接函数
 */
export const compose = (...fns) =>
  fns.reduce((fn1, fn2, i) =>
    i === 0 ? curry(_compose(fn1, fn2)) : _compose(fn1, fn2)
  )

// // #region other
//
// const add = i => i + 1
// const mul = i => i * 2
// // console.log(_compose(add, mul)(1))
//
// const add2 = (a, b) => a + b
// const mul2 = (a, b) => a * b
// const div2 = (a, b) => a / b
// // console.log(_compose(add2, div2)(1)(2)(2))
//
// console.log(
//   compose(
//     add,
//     mul,
//     add2,
//   )(1)(3),
// )
// // #endregion
//
// // #region test
//
// // console.log(
// //   compose(
// //     add2,
// //     mul2,
// //     div2
// //   )(1, 2)(3)(2)
// // )
// // console.log(
// //   compose(
// //     add2,
// //     compose(
// //       mul2,
// //       div2
// //     )
// //   )(1)(2)(3)(2)
// // )
// // console.log(
// //   compose(
// //     compose(
// //       add2,
// //       mul2
// //     ),
// //     div2
// //   )(1, 2)(3)(2)
// // )
//
// // console.log(
// //   compose(
// //     add2,
// //     mul2
// //   )(curry._, 2)(3)
// // )
//
// // #endregion
