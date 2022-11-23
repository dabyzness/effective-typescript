// Union Types
function printObject(obj: string | number) {
  console.log(`obj = ${obj}`);
}

// Original:
function addWithUnion(arg1: string | number, arg2: string | number) {
  // The statement below returns an error
  // return arg1 + arg2;
}

// With Type Guards
function addWithTypeGuard(arg1: string | number, arg2: string | number) {
  if (typeof arg1 === "string") {
    console.log(`arg1 is a string`);
    return arg1 + arg2;
  }
  if (typeof arg1 === "number" && typeof arg2 === "number") {
    console.log(`Both args are numbers`);
    return arg1 + arg2;
  }

  return arg1.toString() + arg2.toString();
}

// console.log(` "1", "2" = ${typeof addWithTypeGuard("1", "2")}`);
// console.log(`  1 ,  2  = ${typeof addWithTypeGuard(1, 2)}`);
// console.log(`  1 , "2" = ${typeof addWithTypeGuard("1", 2)}`);

// With Type aliases
type StringOrNumber = string | number;
function addWithTypeAlias(arg1: StringOrNumber, arg2: StringOrNumber) {
  return arg1.toString() + arg2.toString();
}

// Enums
enum DoorState {
  Open = 17, // default is set to 0
  Closed,
}

function checkDoorState(state: DoorState) {
  console.log(`enum value is: ${state}`);
  switch (state) {
    case DoorState.Open:
      console.log(`Door is open`);
      break;
    case DoorState.Closed:
      console.log(`Door is closed`);
      break;
  }
}

// checkDoorState(DoorState.Open);
// checkDoorState(DoorState.Closed);

enum DoorStateSpecificValues {
  Open = 3,
  Closed = 7,
  Unspecified = 256,
}

enum DoorStateString {
  Open = "Open",
  Closed = "Closed",
}

const enum DoorStateConst {
  Open = 10,
  Closed = 20,
}

// console.log(`const Closed = ${DoorStateConst.Open}`);

// Undefined
let arr = ["123", "456", "789"];
delete arr[0];
for (let i = 0; i < arr.length; i++) {
  // checkAndPrintElement(arr[i]);
}

function checkAndPrintElement(arrElement: string | undefined) {
  if (arrElement === undefined) {
    console.log(`invalid array element`);
  } else {
    console.log(`valid array element: ${arrElement}`);
  }
}

// Null
// null indicates variable has no value
// undefined indicates variable is not defined in the current scope
function printValues(a: number | null) {
  console.log(`a: ${a}`);
}

// printValues(1);
// printValues(null);

// Conditional Expressions
const value: number = 10;
const message: string =
  value > 10 ? "value is larger than 10" : "val is 10 or less";
console.log(message);

// Optional Chaining
const objectA = {
  nestedProperty: {
    name: "nestedPropertyName",
  },
};
function printNestedOptionalChain(obj) {
  if (obj?.nestedProperty?.name) {
    console.log(`name = ${obj.nestedProperty.name}`);
  } else {
    console.log(`name not found or undefined`);
  }
}

// printNestedOptionalChain(undefined);
// printNestedOptionalChain({
//   aProperty: "another property",
// });
// printNestedOptionalChain({
//   nestedProperty: {
//     name: null,
//   },
// });
// printNestedOptionalChain({
//   nestedProperty: {
//     name: "nestedPropertyName",
//   },
// });

// Nullish Coalescing
function nullishCheck(a: number | undefined | null) {
  console.log(`a: ${a ?? `undefined or null`}`);
}

// nullishCheck(1);
// nullishCheck(null);
// nullishCheck(undefined);

// Null or undefined operands
function testNullOperands(a: number, b: number | null | undefined) {
  return a + (b ?? 0);
}

// Definite assignment -- add exclamation point to end of variable call
// Typescript thinks global string is not defined. HOWEVER IT IS, We shouldn't
// really use this often, we should restructure our code instead
var globalString: string;
setGlobalString("this string is set");
// console.log(`globalString = ${globalString!}`);
function setGlobalString(value: string) {
  globalString = value;
}

// Object
let structuredObject: object = {
  name: "myObject",
  properties: {
    id: 1,
    type: "AnObject",
  },
};

function printObjectType(a: object) {
  console.log(`a: ${JSON.stringify(a)}`);
}

printObjectType(structuredObject);
// printObjectType("this is a string");

// Unknown
let what: unknown = "hi";
what = 1;
let aNumber: number;
// Does not work
// aNumber = what;
// Need to explicitly type it
aNumber = <number>what;

// Never
function alwaysThrows(): never {
  throw new Error("this will always throw");
}

// Never and switch
enum AnEnum {
  FIRST,
  SECOND,
}
function getEnumValue(enumValue: AnEnum): string {
  switch (enumValue) {
    case AnEnum.FIRST:
      return "First Case";
    case AnEnum.SECOND:
      return "Second Case";
  }
  let returnValue: never = enumValue;
  return returnValue;
}

// Tuples
// Need to define everything in a tuple
let tuple1: [number, string]; // Needs both of these
let tuple2: [number, string?]; // The second one is optional
let tuple3: [number, ...string[]]; // Can have any number of strings
