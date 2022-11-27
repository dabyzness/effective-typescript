// Callbacks

function delayedResponseWithCallback(callback: () => void) {
  function executeAfterTimeout() {
    console.log(`5. executeAfterTimeout()`);
    callback();
  }
  console.log(`2. calling setTimeout`);
  setTimeout(executeAfterTimeout, 1000);
  console.log(`3. After calling setTimeout`);
}

function callDelayedAndWait() {
  function afterWait() {
    console.log(`6. afterWait()`);
  }
  console.log(`1. calling delayedResponseWithCallback`);
  delayedResponseWithCallback(afterWait);
  console.log(`4. after calling delayedResponseWithCallback`);
}

callDelayedAndWait();

// Promises
// Promise functions accept 2 callback functions as arguments, resolve and reject
function delayedPromise(): Promise<void> {
  // return a Promise object
  return new Promise<void>(
    // start constructor
    (
      resolve: () => void, // resolve function
      reject: () => void // reject function
    ) => {
      // function definition
      function afterTimeout() {
        resolve();
      }
      setTimeout(afterTimeout, 1000);
      // end of function definition
    }
  ); // end constructor
}
// Call the function and do something
delayedPromise().then(() => {
  console.log(`Delayed promise returned`);
});

// Promise errors -- reject
function errorPromise(): Promise<void> {
  return new Promise<void>((resolve: () => void, reject: () => void) => {
    console.log(`2. calling reject()`);
    reject();
  });
}
console.log(`1. calling errorPromise()`);
errorPromise()
  .then(() => {})
  .catch(() => {
    console.log(`3. caught an error`);
  });

// Returning values from Promises
// The following function will resolve with a string and reject with a number.
// We will be able to see these values in then/catch methods
// As we can see both resolve and reject functions still have a return of void. This is because the arguments for resolve and reject are the values that are passed into then/catch
// Resolve and Reject functions can only take ONE parameter, no more.
function promiseReturningString(throwError: boolean): Promise<string> {
  return new Promise<string>(
    (
      resolve: (outputValue: string) => void,
      reject: (errorCode: number) => void
    ) => {
      if (throwError) {
        reject(101);
      }
      resolve(`resolve with message`);
    }
  );
}

console.log(`1. calling promiseReturningString`);
promiseReturningString(false)
  .then((returnValue: string) => {
    console.log(`2. returnedValue: ${returnValue}`);
  })
  .catch((error: number) => {
    console.log(`this is not called`);
  });

// Promise return types
// Let's try this with a few different types:
interface Connection {
  server: string;
  port: number;
}
interface Error {
  code: number;
  message: string;
}
interface DataRow {
  id: number;
  name: string;
  surname: string;
}

function complexPromise(
  connection: Connection,
  accessKey: string
): Promise<DataRow[]> {
  return new Promise<DataRow[]>(
    (
      resolve: (results: DataRow[]) => void,
      reject: (results: Error) => void
    ) => {
      // Do thinsg here
      // check connection properties
      // connect to database
      // retrieve and resolve data
      // or reject with an error
    }
  );
}

complexPromise({ server: "test", port: 4200 }, "abcd")
  .then((rows: DataRow[]) => {
    // do something with the data
  })
  .catch((err: Error) => {
    // handle error
  });
