import singleModel from './singleModel'

test('使用 singleModel 包装的 class 应该是单例的', () => {
  const Person = singleModel(
    class Person {
      constructor (name, age) {
        this.name = 'liuli'
        this.age = 17
      }
      hello () {
        console.log(
          `hello, my name is ${this.name}, ${this.age} finished is year.`
        )
      }
    }
  )
  const person1 = new Person()
  const person2 = new Person()
  expect(person1 === person2).toBe(person1)
})
