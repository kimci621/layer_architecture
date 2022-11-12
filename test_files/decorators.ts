//обычный декаратор который возвращает сам объект
function Simple(target: Function) {
  console.log(target);
}
//декоратор, который возвращает объект и меняет его свойство
function EditArg(newId: number) {
  return (target: Function) => {
    target.prototype.id = newId;
    console.log(target.prototype.id);
  };
}
//декаратор для методов объекта
function Method(
  target: Object,
  propertyKey: string,
  propertyDescriptor: PropertyDescriptor
) {
  console.log(propertyKey);
  console.log(propertyDescriptor);
  propertyDescriptor.value = function (...args: any[]) {
    return args[0];
  };
}
//декаратор для свойств объекта
function Prop(target: Object, propertyKey: string) {
  let value: number;

  const getter = () => {
    return value;
  };
  const setter = (newValue: number) => {
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
}
//декоратор для параметров функции
function Param(target: Object, propertyKey: string, index: number) {
  console.log(propertyKey, index);
}

@Simple  // вернул сам класс
@EditArg(22) // поменял id на 22
class User {
  @Prop id: number; // определил getter и setter для свойства
  constructor(@Param id: number) { //просто вывожу параметр
    this.id = id;
  }

  @Method
  showId() {
    console.log(this.id);
  }
}

new User(1);
new User(2).showId();
