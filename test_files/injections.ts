import "reflect-metadata";
/*
reflect-metadata нужна чтобы хранить данные в глобальном пространстве
Reflect.defineMetadata(ключДляСохраненияВReflect, какиетоДанные, ОбъектДляКогоБудутХранитьсяДанные); - запись в объект Reflect
Reflect.getMetadata(key, target); - достать из Reflect
Используют библиотеку в основном для классов в связке с декораторами
*/

//сохраняем класс в Reflect и тут же его возвращаем из него
function Inject(key: string): Function {
  return (target: Function) => {
    Reflect.defineMetadata(key, 1, target);
    const meta = Reflect.getMetadata(key, target);
    return meta;
  };
}
//сохранили класс
@Inject("InjectableClass")
class InjectableClass {
  id: Number;
  name: String;
}
//сохранили класс
@Inject("ClassForInjecting")
class TestingInject {
  constructor(@Inject("InjectableClass") injectedClass: InjectableClass) {} //передали класс в аргумент с помощью декоратора
}
