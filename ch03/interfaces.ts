interface IIDName {
  id: number;
  name: string;
}

let idObject: IIDName = {
  id: 2,
  name: "this is a name",
};

// Optional Properties
interface IOptional {
  id: number;
  name?: string;
}

// Interfaces do not generate any JavaScript code.

// Weak Types
// We should be thinking differently about this interface
// Bad practice to make all properties optional
interface WeakType {
  id?: number;
  name?: number;
}

// Even though it's a weak type we still shouldn't do this
// let weakTypeNoOverlap: WeakType = {
//   description: "a description",
// };

// The in operator
interface IdName {
  id: number;
  name: string;
}
interface DescrValue {
  descr: string;
  value: number;
}

function printNameOrValue(obj: IdName | DescrValue): void {
  // We don't use an if else statement here in case an object implements BOTH interfaces
  if ("id" in obj) {
    console.log(`obj.name : ${obj.name}`);
  }
  if ("descr" in obj) {
    console.log(`obj.value: ${obj.value}`);
  }
}

printNameOrValue({
  id: 1,
  name: "nameValue",
});
printNameOrValue({
  descr: "description",
  value: 2,
});

// keyof
interface Person {
  id: number;
  name: string;
}

type PersonPropertyName = keyof Person;
// Same as writing:
type PersonProperytLiteral = "id" | "name";

function getProperty(key: PersonPropertyName, value: Person) {
  console.log(`${key} = ${value[key]}`);
}

getProperty("id", { id: 1, name: "firstName" });
getProperty("name", { id: 2, name: "secondName" });
// getProperty("telephone", { id: 3, name: "thirdName" }); // Will cause error
