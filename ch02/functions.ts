// Optional parameters
function concatValues(a: string, b?: string) {
  console.log(`a + b = ${a + b}`);
}

// concatValues("first", "second");
// concatValues("first");

// Default params
function concatWithDefault(a: string, b: string = "default") {
  console.log(`a + b = ${a + b}`);
}

// concatWithDefault("first", "second");
// concatWithDefault("first");

// Rest params
function testArguments(...args: string[] | number[]) {
  for (let i = 0; i < args.length; i += 1) {
    console.log(`argument[${i}] = ${args[i]}`);
  }
}

// testArguments(1, 2);
// testArguments("first", "second", "third");

// Callbacks
const myCallback = function (text: string): void {
  console.log(`myCallback called with text ${text}`);
};

function withCallbackArg(message: string, callbackFn: (text: string) => void) {
  console.log(`withCallback called, message: ${message}`);
  callbackFn(`${message} from withCallback`);
}

// withCallbackArg("initial Text", myCallback);

//  Function override
function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: any, b: any) {
  return a + b;
}

// Literals
type AllowedStringValues = "one" | "two" | "three";
type AllowedNumricValues = 1 | 20 | 65535;
function withLiteral(input: AllowedNumricValues | AllowedStringValues) {
  console.log(`called with ${input}`);
}
