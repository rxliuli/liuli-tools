const arr = [1, 2, 3, 4]
const temp = [2, 3]
const temp2 = [3, 5]

const set = new Set(arr)
console.log(temp.every(set.has.bind(set)))
console.log(temp2.every(set.has.bind(set)))

const map = new Map<number, string[]>().set(1, []).set(2, [])
console.log(map.get(1)!.map(i => i))

const array = [1, 2]
console.log(((array as unknown) as Map<string, string>).keys())
