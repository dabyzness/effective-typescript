// Advanced Type Inferences

// Mapped Types
interface AbRequired {
  a: number;
  b: string;
}
let ab: AbRequired = {
  a: 1,
  b: "test",
};
type WeakInterface<T> = {
  [K in keyof T]?: T[K];
};
let allOptional: WeakInterface<AbRequired> = {};
// What this code does is:
// 1. Create an interface that has two required properties
// 2. We create a type of that interface, with the exact same properties, whatever those properties may be, BUT we make them optional.
// 3. This lets us now have a type that can only have the properties of the interface, but they are all optional. This way we can use them for different purposes.
// Hence, we mapped an interface into a type.

// Partial, Readonly, Record, and Pick
// In TypeScript, the above mapped typing already exists and it's called Partial, adn looks just like type WeakInterface<T>;
// There are a few more besides Partial, and those include:
// Partial --> Make every key optional
type PartialAb = Partial<AbRequired>;
// Required --> Make ever key required
type RequiredAb = Required<AbRequired>;
// Readonly --> Make every key readonly
type ReadonlyAb = Readonly<AbRequired>;
// Pick --> Allows you to create a new type with only the properties you want
interface Abc {
  a: number;
  b: string;
  c: boolean;
}
type PickAb = Pick<Abc, "a" | "b">;
// PickAb is now a type with ONLY 'a' and 'b', the 'c' is no longer there
// Record --> Create a type on the fly:
type RecordAb = Record<"a" | "b", number>;
// type RecordAb now has two properties a and b that are of type number

// Conditional types
// We can even use the ternary when declaring generic types
// What the below says, is IF the variable assigned to this type is a number, then T is a number, ELSE it's a string
type NumberOrString<T> = T extends number ? number : string;
// Then we can use in a function like so:
function logNumberOrString<T>(input: NumberOrString<T>) {
  console.log(`logNumberOrString : ${input}`);
}
// Let's go through and see what's happening here.
// 1. Let's call this function --> logNumberOrString<number>(1);
// 2. We explicitly state that T is a number.
// 3. The function now checks to see if input is the right type
// 4. input is of type NumberOrString<T> --> but we have that conditional
// 5. the conditional returned true, so it becomes NumberOrString<number>
// 6. It checks whether 1 is a number --> It is, so the function runs.

// Conditional type chaining
// We can even chain conditional types!
interface A {
  a: number;
}
interface Ab {
  a: number;
  b: string;
}
interface Abc {
  a: number;
  b: string;
  c: boolean;
}
type abc_ab_a<T> = T extends Abc
  ? [number, string, boolean]
  : T extends Ab
  ? [number, string]
  : T extends A
  ? [number]
  : never;
// In the above case, we created a type where the generic can extend multiple different interfaces. We use TUPLEs here to tell the type what type the object will be!
// IF the input has all 3 properties, then make the type have all 3 properties
// ELSE IF the input only has 2/3, set to those
// ELSE IF ...
// ELSE it'll never happen, whatever is in here is wrong
function getTupleStringAbc<T>(tupleValue: abc_ab_a<T>): string {
  let [...tupleDestructured] = tupleValue;
  let returnString = "|";
  for (let value of tupleDestructured) {
    returnString += `${value}|`;
  }
  return returnString;
}
let keyA = getTupleStringAbc<A>([1]);
console.log(`keyA = ${keyA}`);
let keyAb = getTupleStringAbc<Ab>([1, "test"]);
console.log(`keyAb = ${keyAb}`);
let keyAbc = getTupleStringAbc<Abc>([1, "test", true]);
console.log(`keyAbc = ${keyAbc}`);

// Distributed Conditional Types
// We can also chain conditionals and return MULTIPLE types insetad of just one:
type dateOrNumberOrString<T> = T extends Date
  ? Date
  : T extends number
  ? Date | number
  : T extends string
  ? Date | number | string
  : never;
function compareValues<T extends string | number | Date | boolean>(
  input: T,
  compareTo: dateOrNumberOrString<T>
) {
  // do comparison here
}

// if the input parameter is of type Date, the compareTo parameter can be ONLY of type Date
compareValues(new Date(), new Date());
// compareValues(new Date(), 1); // Does not work
// If hte input parameter is of type number, the compareTo parameter can be ONLY of types Date or number
compareValues(1, new Date());
compareValues(1, 2);
// compareValues(1, "hi"); // Does not work
// If the input paramter is of type string, the compareTo parameter can be ONLY of type Date, number, or string
compareValues("test", new Date());
compareValues("test", 1);
compareValues("test", "test");
// If the input parameter is not of type Date, number or string, the function will not run
// compareValues(true, new Date()); // Does not work

// Conditional Type Inference
type inferFromPropertyType<T> = T extends { id: infer U } ? U : never;
// Here we are setting the type to be:
// 1. T needs to be an object that has an id property
// 2. The final type will be the inferred type of id property.
// If T DOES NOT have an id property, then the function will not run
function testInferFromPropertyType<T>(arg: inferFromPropertyType<T>) {}
testInferFromPropertyType<{ id: string }>("test");
testInferFromPropertyType<{ id: number }>(1);
// testInferFromPropertyType< {name: string} > ("hellow"); // Does not work

// Type inference from function signatures
// We can also infer typing from the arguments of a function!
type inferredFromFnParam<T> = T extends (a: infer U) => void ? U : never;
// This will check whether the function has one parameter and has no return.
// Then it will force the type to be inferred from the typing of the param.
function testInferredFromFnParam<T>(arg: inferredFromFnParam<T>) {}
testInferredFromFnParam<(a: number) => void>(1);
testInferredFromFnParam<(a: string) => void>("test");
// testInferredFromFnParam<(a: boolean, b: string) => void>(true); // Too many params, doesn't work
// testInferredFromFnParam<(a: string) => string>("hello"); // Should not work but it doesn't error out --> strange

// We can also infer typing from the function return!
type inferredFromFnReturnType<T> = T extends (a: string) => infer U ? U : never;
// In this case, the function must have one paramter of type string, if it does, then the return of that function will be the type, otherwise the function will not run

// Type inference from arrays
type inferredTypeFromArray<T> = T extends (infer U)[] ? U : never;
function testInferredFromArray<T>(args: inferredTypeFromArray<T>) {}
testInferredFromArray<string[]>("test");
testInferredFromArray<number[]>(12);
// testInferredFromArray<string>("hi"); // Does not work

// Standard conditional types
// TypeScript also has included some standard type combinations for us to use with some easy to remember keywords:
// Exclude --> Takes 2 generic parameters, excludes types names in second parameter from first parameter
// In this case, the type will be a boolean, because we're excluding the first two types, string and number
type ExcludeStringAndNumber = Exclude<
  string | number | boolean,
  string | number
>;
let boolValue: ExcludeStringAndNumber = true;
// Extract --> Takes 2 parameters, extracts the possible types (opposite of exclude)
type ExtractStringOrNumber = Extract<
  string | number | boolean,
  string | number
>;
let stringVal: ExtractStringOrNumber = "Hello";
let numVal: ExtractStringOrNumber = 12;
// NonNullable --> extracts types that are not null or undefined
type NotNullOrUndef = NonNullable<number | undefined | null>;
let numNum: NotNullOrUndef = 12;
