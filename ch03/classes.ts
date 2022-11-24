class SimpleClass {
  id: number | undefined;

  print(): void {
    console.log(`SimpleClass.id = ${this.id}`);
  }
}

let mySimpleClass = new SimpleClass();
mySimpleClass.id = 2020;
// mySimpleClass.print();

// Implementing interfaces
class ClassA implements Print {
  print(): void {
    console.log(`ClassA.print() called.`);
  }
}
class ClassB implements Print {
  print(): void {
    console.log(`ClassB.print() called.`);
  }
}

interface Print {
  print(): void;
}

function printClass(a: Print) {
  a.print();
}

let classA = new ClassA();
let classB = new ClassB();
// printClass(classA);
// printClass(classB);

class ClassC {
  print(): void {
    console.log(`ClassC.print() called.`);
  }
}

let classC = new ClassC();
// printClass(classC);
// Althought the above works without adding implements Print to the class definition, it is bad practice to do this. Because if we end up changing the interface or the class, we might not proper error handling!

// Class constructors
// Note, we no longer need to set id as undfined because we're initializing id in the constructor so it will always have a value
class ClassWithConstructor {
  id: number;
  constructor(_id: number) {
    this.id = _id;
  }
}

let classWithConstructor = new ClassWithConstructor(10);
console.log(`classWithConstructor = ${JSON.stringify(classWithConstructor)}`);

// The properites we've created in these classes are all public.
// Let's explore a private property
// Private Fields
class ClassWithPrivateField {
  private id: number;

  constructor(id: number) {
    this.id = id;
  }
}

let privateAccess = new ClassWithPrivateField(10);
// privateAccess.id = 20;
// The above cannot access the property

// Constructor Parameter Properties
class ClassWithCtorMods {
  constructor(public id: number, private name: string) {}
}

let myClassMod = new ClassWithCtorMods(1, "test");
console.log(`myClassMod.id = ${myClassMod.id}`);
// console.log(`myClassMod.name = ${myClassMod.name}`);

// ReadOnly
class ClassWithReadonly {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
  // setNameValue(name: string) {
  //   this.name = name; // ERROR
  // }
}

// Get and Set
class ClassWithAccessors {
  private _id: number = 0;

  get id(): number {
    console.log(`get id property`);
    return this._id;
  }

  set id(value: number) {
    console.log(`set id property`);
    this._id = value;
  }
}

let classWithAccessors = new ClassWithAccessors();
classWithAccessors.id = 10;
console.log(`classWithAccessors.id = ${classWithAccessors.id}`);
// ALthough it looks like we're just accessing the id property, we're actually calling a function to get or set the _id property

// Static functions
// static means there will only be one instance of this function over the entire codebase
class StaticFunction {
  static printTwo() {
    console.log(`2`);
  }
}

// It also means that we can call this function without ever instantiating the class!
StaticFunction.printTwo();

// Static Properties
// Just like static functions, classes can also have static properties.
class StaticProperty {
  static count = 0;
  updateCount() {
    StaticProperty.count++;
  }
}

let firstInstance = new StaticProperty();
let secondInstance = new StaticProperty();
firstInstance.updateCount();
console.log(`StaticProperty.count = ${StaticProperty.count}`);
secondInstance.updateCount();
console.log(`StaticProperty.count = ${StaticProperty.count}`);
// Although there are two separate instances of StaticProperty, both functions update the exact same property of count. This is because of static, which says there is only one instance of count throughout the entire code base and thus every instance of StaticProperty shares the same count;

// Namespaces
// When working with large projects and libraries, there may come a time where two classes or interfaces share the same name. TS uses namespaces to cater to these situations. Still no clue how to use them, but it's something! In order to use the class, you must export it using the export keyword!
namespace FirstNameSpace {
  export class NameSpaceClass {}
  class NotExported {}
}

let nameSpaceClass = new FirstNameSpace.NameSpaceClass();
// let notExported = new FirstNameSpace.NotExported(); // Not exported so inaccessible

// Inheritance
// use keyword extends to implement inheritance

// Interface Inheritance
interface Base {
  id: number;
}

interface DerivedFromBase extends Base {
  name: string;
}

class IdNameClass implements DerivedFromBase {
  id: number = 0;
  name: string = "nameString";
}

// Also possible to extend the same property but specify the type!
interface BaseStrNum {
  id: string | number;
}

interface DerivedFromBaseNum extends BaseStrNum {
  id: number;
}

// Interfaces also support multiple inheritances
interface Multiple extends DerivedFromBase, DerivedFromBaseNum {
  description: string;
}

let multipleObject: Multiple = {
  id: 1,
  name: "myName",
  description: "myDescription",
};

// Class Inheritance
class BaseClass implements Base {
  id: number = 0;
}
class DerivedFromBaseClass extends BaseClass implements DerivedFromBase {
  name: string = "nameString";
}

// Classes cannot extend multiple classes, but they can implement multiple interfaces
interface FirstInterface {
  id: number;
}
interface SecondInterface {
  name: string;
}
class MultipleInterfaces implements FirstInterface, SecondInterface {
  id: number = 0;
  name: string = "nameString";
}

// The Super function
class BaseClassWithCtor {
  private id: number;
  constructor(id: number) {
    this.id = id;
  }
}
class DerivedClassWithCtor extends BaseClassWithCtor {
  private name: string;
  constructor(id: number, name: string) {
    super(id);
    this.name = name;
  }
}

// Function overriding
class BaseClassWithFn {
  print(text: string) {
    console.log(`BaseClassWithFn.print(): ${text}`);
  }
}
class DerivedClassFnOverride extends BaseClassWithFn {
  print(text: string) {
    console.log(`DerivedClassFnOverride.print(${text})`);
  }
}

let derivedClassFnOverride = new DerivedClassFnOverride();
derivedClassFnOverride.print("poop");

// However, instead of overriding, we can still call the base class' function through using the super keyword!
class DerivedClassFnCallthrough extends BaseClassWithFn {
  print(text: string) {
    super.print(`from DerivedClassFnCallthrough : ${text}`);
  }
}
let derivedClassFnCallthrough = new DerivedClassFnCallthrough();
derivedClassFnCallthrough.print("poop");

// Protected
// Classes can mark both properties and functions as protected, which means they are only available within the class itself and not accessible outside of the class. This is different than private because you can use get and set to access private properties outside of the class. Also, protected properties/functions can be accessed by a derived class which extends the original class, but private properties cannot.
class BaseClassProtected {
  protected id: number;
  private name: string = "";
  constructor(id: number) {
    this.id = id;
  }
}
class AccessProtected extends BaseClassProtected {
  constructor(id: number) {
    super(id);
    console.log(`base.id = ${this.id}`);
    // console.log(`base.name = ${this.name}`); // Errors out because name is a private property
  }
}

let accessProtected = new AccessProtected(1);
// accessProtected.id = 1; // Errors out, only accessible by BaseClassProtected and subclasses
// accessProtected.name = "test"; // Errors out, only accessible by BaseClassProtected

// Abstract Classes
// These are classes that cannot be instantiated --> Only can be derived from
// Purpose of these classes is to provide a set of basic properties or function that are shared across a group of similar classes.
// Marked with the abstract keyword
abstract class EmployeeBase {
  public id: number;
  public name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
class OfficeWorker extends EmployeeBase {}
class OfficeManager extends OfficeWorker {
  public employees: OfficeWorker[] = [];
}

// We can also add abstract to class methods
// The method is not allowed to have a definition. It must be defined on the derived class.
abstract class EmployeeBase1 {
  public id: number;
  public name: string;
  abstract doWork(): void;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
class OfficeWorker1 extends EmployeeBase1 {
  doWork() {
    console.log(`${this.name} : doing work`);
  }
}
class OfficeManager1 extends OfficeWorker1 {
  public employees: OfficeWorker1[] = [];
  manageEmployees() {
    super.doWork();
    for (let employee of this.employees) {
      employee.doWork();
    }
  }
}

// instanceof
// this tests whether the given function name appears in the prototype of an object. Detects whether one class is an instance of (or is extended by) another class
class A {}
class BfromA extends A {}
class CfromA extends A {}
class DfromC extends CfromA {}

console.log(`A instance of A : 
    ${new A() instanceof A}`);
console.log(`BfromA instance of A : 
    ${new BfromA() instanceof A}`);
console.log(`BfromA instance of BfromA : 
    ${new BfromA() instanceof BfromA}`);
console.log(`CfromA instance of BfromA : 
    ${new CfromA() instanceof BfromA}`);
console.log(`DfromC instance of CfromA : 
    ${new DfromC() instanceof CfromA}`);
console.log(`DfromC instance of A : 
    ${new DfromC() instanceof A}`);

// Interfaces extending classes
// Interface can be derived from a class
class BaseInterfaceClass {
  id: number = 0;
  print() {
    console.log(`this.id = ${this.id}`);
  }
}
interface BaseInterfaceClassExt extends BaseInterfaceClass {
  setId(id: number): void;
}

// THen when we create a new class, we have a simple interface to use:
class ImplementsExt
  extends BaseInterfaceClass
  implements BaseInterfaceClassExt
{
  setId(id: number): void {
    this.id = id;
  }
}
