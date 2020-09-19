// инициализируем переменную, содержащую массив объектов 
var items = [
  { name: "Миша", age: 23 },
  { name: "Вася", age: 44 },
  { name: "Саша", age: 2 },
  { name: "Рома", age: 99 },
  { name: "Ашот", age: 19 }
];

// сортируем объекты внутри массива по свойству name (по алфавиту) 
let arr = items.sort((a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  // a должно быть равным b
  return 0;
});
console.log(arr); // выводим в консоль результат сортировки 
