class MockAsync {
  executeSlowFunction(complete: (value: string) => void) {
    setTimeout(() => {
      complete(`completed`);
    }, 1000);
  }
}

describe("failing async tests", () => {
  it("should wait for callback to complete", () => {
    let mockAsync = new MockAsync();
    console.log(`1. calling executeSlowFunction`);
    let returnedValue!: string;
    mockAsync.executeSlowFunction((value: string) => {
      console.log(`2. complete called`);
      returnedValue = value;
    });
    console.log(`3. checking return value`);
    expect(returnedValue).toBe("completed"); // Fails
  });
});
// The reason the above test fails it is not waiting for the setTimeout function to finish before continuing on with the test. In order to wait for async functions to work with tests, we need to use the done keyword and to do so we need to refactor the test a bit
// done
describe("async test with done", () => {
  let returnedValue!: string;
  beforeEach((done: jest.DoneCallback) => {
    let mockAsync = new MockAsync();
    console.log(`1. calling executeSlowFunction`);
    mockAsync.executeSlowFunction((value: string) => {
      console.log(`2. complete called`);
      returnedValue = value;
      done();
    });
  });
  it("should return value after 1 second", () => {
    console.log(`3. checking returned value`);
    expect(returnedValue).toEqual("completed");
  });
});
// done can be passed into any beforeAll, beforeEach, and it function. it basically waits for the done function to be called before continuuing on. In this case, because executeSlowFunction takes a full second to complete, the test cased defined in 'it' will not run until done() is called, and done takes a full second to call. done does have a timeout though, of 5 seconds, which can be overridden.

// Using async await
// If we're using Promises, then we can use async await syntax to run tests in teh same way we normally would.
// Example
class AsyncWithPromise {
  delayedPromise(): Promise<string> {
    return new Promise<string>(
      (resolve: (str: string) => void, reject: (str: string) => void) => {
        setTimeout(() => {
          console.log(`2.returning success`);
          resolve("success");
        }, 1000);
      }
    );
  }
}
describe("async test", () => {
  it("should wait 1 second for promise to resolve", async () => {
    let asyncWithPromise = new AsyncWithPromise();
    console.log(`1. calling delayedPromise`);
    let returnValue = await asyncWithPromise.delayedPromise();
    console.log(`3. after await`);
    expect(returnValue).toEqual("success");
  });
});
