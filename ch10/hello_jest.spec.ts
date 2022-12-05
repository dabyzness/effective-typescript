// Single Test
test(`should be false`, () => {
  expect(false).toBeFalsy();
});

// Grouping tests
describe("a group of test", () => {
  // test --> Jest's default
  test("first test", () => {
    expect("string value").toEqual("string value");
  });
  // it --> Jasmine's default
  it("second test", () => {
    expect("abc").not.toEqual("def");
  });
});

// Forcing and skipping tests
describe("a group of tests2", () => {
  // test.only --> FORCE this test, skip all others
  test(/*.only*/ "first test", () => {
    expect("string value").toEqual("string value");
  });
  // fit --> force it
  /*f*/ it("second test", () => {
    expect("abc").not.toEqual("def");
  });
});
// We can also use 'fdescribe' instead of 'describe' for group forcing
// If we want to skip a test inside of 'fdescribe', we would preface the test with 'xit' instead of 'it'
// Skipping tests is generally not a good idea though

// Matchers
it("should match with toBe", () => {
  expect(1).toBe(2); // Will Fail
});

it("should match with toBe using assignment", () => {
  let objA = { id: 1 };
  let objB = objA;
  expect(objA).toBe(objB); // Passes
});

it("should match with toBe, object", () => {
  let objA = { id: 1 };
  let objB = { id: 1 };
  expect(objA).toBe(objB); // Will fail because these are two different objects
  // JEst will recommend using toStrictEqual here instead
});

it("should match with toEqual", () => {
  let objA = { id: 1 };
  let objB = { id: 1 };
  expect(objA).toEqual(objB); // Passes
});

it("should contain a value", () => {
  expect("abcde").toContain("cde"); // Passes
});

it("shold not contain a value", () => {
  expect("abcde").not.toContain("123"); // Passes
});

// We can also add function that are supposed to throw Errors and check if the error is thrown!
function throwsError() {
  throw new Error("this is an error");
}
it("should throw an error", () => {
  expect(() => {
    throwsError();
  }).toThrowError(new Error("this is an error"));
});

// Test setup and teardown
// Before we run a test, we may want to exercise some code beforehand. This may be to initialize a particular variable, or to make sure that the dependencies of an object have been set up.
//  Example:
class GlobalCounter {
  count: number = 0;
  increment(): void {
    this.count++;
  }
}
describe("test setup and teardown", () => {
  let globalCounter: GlobalCounter;
  // beforeAll runs ONCE before anything
  beforeAll(() => {
    globalCounter = new GlobalCounter();
  });
  // beforeEach runs before each test
  beforeEach(() => {
    globalCounter.count = 0;
  });
  // afterEach runs after each test
  afterEach(() => {
    console.log(`globalCounter.count = ${globalCounter.count}`);
  });

  it("should incremement", () => {
    globalCounter.increment();
    expect(globalCounter.count).toEqual(1);
  });
  it("should increment twice", () => {
    globalCounter.increment();
    globalCounter.increment();
    expect(globalCounter.count).toEqual(2);
  });
});

// Data-driven tests
// Quite often, we need the same test to be run multiple times, but with different input values:
[1, 2, 3, 4, 5].forEach((value: number) => {
  it(`${value} should be less than 5`, () => {
    expect(value).toBeLessThan(5); // The first 4 pass and the last fails
  });
});

// Below function that we're testing
function hasValueNoWhiteSpace(value: string): boolean {
  if (value && value.length && value.trim().length) {
    return true;
  }
  return false;
}
// We create a function that can test multiple things
// It accepts a array of generics and a callback function
function testUsing<T>(values: T[], func: Function) {
  for (let value of values) {
    // Loops through each of the values and calls apply on the callback function, which passes value into the callback function
    func.apply(Object, [value]);
  }
}
// Here we call that newly made utility function
testUsing(
  // The tuple set we'll be testing
  [
    [undefined, false],
    [null, false],
    [" ", false],
    ["  ", false],
    [" a ", true],
  ],
  // Callback function -- it accepts one parameter, a tuple. func.apply passes in the tuples from the set to this callback function
  ([value, isValid]: [string, boolean]) => {
    it(`"value" hasValueNoWhiteSpace ? ${isValid}`, () => {
      isValid
        ? expect(hasValueNoWhiteSpace(value)).toBeTruthy()
        : expect(hasValueNoWhiteSpace(value)).toBeFalsy();
    });
  }
);
// Data driven tests are a convenient way of writing unit tests where the only real change to a series of tests is either an input or a resulting value, but the body of the best itself remains the same.

// Jest mocks
// When testing our code we often have a situation where we want to ensure that particular function was called and called with the correct parameters. This is like if you have a function that call other functions in sequence in order to execute some business logic.
// Say we have an initialize function that, when called, calls multiple REST services. When writing a test for the intialize function, we would want to ensure that all of the calls to REST services were called. To ensure that functions are calledm we use Jest mocks, or Jest spies
// Example
class MyCallbackClass {
  executeCallback(value: string, callbackFn: (value: string) => null) {
    console.log(`executeCallback invoking callbackFn`);
    callbackFn(value);
  }
}
it("should mock callback function", () => {
  // jest.fn essentially create a mock function, which can then be used as a quick replacement for a callback function
  let mock = jest.fn();
  let myCallbackClass = new MyCallbackClass();
  myCallbackClass.executeCallback("test", mock);
  // Checks whether the callback function was successfully called
  expect(mock).toHaveBeenCalled();
});
// And we can check to see whether the function was called with proper parameter!
it("should call testFunction with argument using mock", () => {
  let mock = jest.fn();
  let myCallbackClass = new MyCallbackClass();
  myCallbackClass.executeCallback("argument_1", mock);
  expect(mock).toHaveBeenCalledWith("argument_1");
});

// Jest spies
// We can also check whether a particular class method has been called using spies
// Example
class MySpiedClass {
  testFunction() {
    console.log(`testFunction() called`);
    this.testSpiedFunction();
  }
  testSpiedFunction() {
    console.log(`testSpiedFunction called`);
  }
}
// Here we set up a spy on our class instance, and we're spying on the function testSpiedFunction
// We check to see if it's been called
it("should call testSpiedFunction", () => {
  let mySpiedClass = new MySpiedClass();
  const testFunctionSpy = jest.spyOn(mySpiedClass, "testSpiedFunction");
  mySpiedClass.testFunction();
  expect(testFunctionSpy).toHaveBeenCalled();
});
// Here we're using mockImplementation on the testFunction to override the body of the actual method. This is useful when the body of the method has many API calls which we don't have access to in test and thus cannot use but still want to check if the function was actually called.
it("should call mock of testFunction", () => {
  let mySpiedClass = new MySpiedClass();
  const testFunctionSpy = jest
    .spyOn(mySpiedClass, "testFunction")
    .mockImplementation(() => {
      console.log(`mockImplementation called`);
    });
  mySpiedClass.testFunction();
  expect(testFunctionSpy).toHaveBeenCalled();
});

// Spies returning values
// When we wish to mock out the return value of a function, we can just returna value from mock implementation
class MyMockedClass {
  functionToBeMocked(): number {
    return 5;
  }
}
it("should return value from mocked", () => {
  let myMockedClass = new MyMockedClass();
  jest
    .spyOn(myMockedClass, "functionToBeMocked")
    .mockImplementation((): number => {
      return 10;
    });
  expect(myMockedClass.functionToBeMocked()).toEqual(10);
});
// This way, we can mock out calls to a database, or calls to a REST endpoint, and inject standard values that we can test against
