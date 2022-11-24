import { first } from "rxjs";

function printGeneric<T>(value: T) {
  console.log(`typod T is : ${typeof value}`);
  console.log(`value is : ${value}`);
}

// printGeneric(1);
// printGeneric("test");
// printGeneric(true);
// printGeneric(() => {});
// printGeneric({ id: 1 });

function usingTwoTypes<A, B>(first: A, second: B) {}

// Valid calls -- we can either explicitly specify typing or have Typescript infer the type
usingTwoTypes<number, string>(1, "test");
usingTwoTypes(1, "test");
usingTwoTypes<boolean, boolean>(true, false);
usingTwoTypes("yes", "no");

// In most instances we want to limit the type of T in order to allow only a few specific types in
// <T extends .... > means that inside of class, T can only be either an strign array or number array. Whatever we extend it with, those are the only types that the generic can take.
class Concatenator<T extends Array<string> | Array<number>> {
  public concatenateArray(items: T): string {
    let returnString = "";
    for (let i = 0; i < items.length; i += 1) {
      returnString += i > 0 ? "," : "";
      returnString += items[i].toString();
    }
    return returnString;
  }
}

let concator = new Concatenator();
let concatResult = concator.concatenateArray(["first", "second", "third"]);
console.log(`concat Result = ${concatResult}`);
concatResult = concator.concatenateArray([1000, 2000, 3000]);
console.log(`concat Result = ${concatResult}`);

// We can also extend interfaces
interface PrintId {
  id: number;
  print(): void;
}
interface PrintName {
  name: string;
  print(): void;
}

function useT<T extends PrintId | PrintName>(item: T): void {
  item.print();
  // The bottom will error out because each of these properties only exist on one, but not the other type, which means we can't use it. Therefore, if we want to manipulate these properties, they must exist on both interfaces
  // item.id = 1;
  // item.name = "test";
}

function printProperty<T, K extends keyof T>(object: T, key: K) {
  let propertyValue = object[key];
  console.log(`object[${String(key)}] = ${propertyValue}`);
}

let obj1 = {
  id: 1,
  name: "myName",
  print() {
    console.log(`${this.id}`);
  },
};
printProperty(obj1, "id");
printProperty(obj1, "name");
// printProperty(obj1, "surname"); // Erros because surname is not a key of obj1
printProperty(obj1, "print");

// We can also create interfaces that use generics
interface Print {
  print(): void;
}
interface LogInterface<T extends Print> {
  logToConsole(printObj: T): void;
}
class LogClass<T extends Print> implements LogInterface<T> {
  logToConsole(printObj: T): void {
    printObj.print();
  }
}

let printObject: Print = {
  print() {
    console.log(`printObject.print() called`);
  },
};
let logClass = new LogClass();
logClass.logToConsole(printObject);

// Creating new objects with Generics
class ClassA {}
class ClassB {}
// The following error out because type 'unknown' has no construct signatures
// function createClassInstance<T> (arg1: T): T {
// return new arg1();
// }

// Instead we need to do this:
// What we are doing here is overloading the "new()" function that is on arg1 and explicitly stating that it has a return of type T.
function createClassInstance<T>(arg1: { new (): T }): T {
  return new arg1();
}

let classAInstance = createClassInstance(ClassA);
