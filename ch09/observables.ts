import { of, Observable, from, interval } from "rxjs";
import { map, take } from "rxjs/operators";

const emitter: Observable<number> = of(1, 2, 3, 4);
emitter.subscribe((value: number) => {
  console.log(`value: ${value}`);
});

const emitArray: Observable<number> = from([1, 2, 3, 4]);
emitArray.subscribe((value: number) => {
  console.log(`arr: ${value}`);
});

// pipe and map
// emits values
const emitter2 = of(1, 2, 3, 4);
// modulus holds the result of calling pipe on emit
// The only argumnet we are proving pipe with is the map function, which takes a single function as a parameter and will call this function for each value that is emitted from the Observable (similar to the array map method)
const modulus = emitter2.pipe(
  map((value: number) => {
    console.log(`received: ${value}`);
    return value % 2;
  })
);
// We then subscribe the now modified observables, which will call the passed in function for each of the observables
modulus.subscribe((value: number) => {
  console.log(`modulus: ${value}`);
});

// Combining operators
const emitter3: Observable<number> = of(1, 2, 3, 4);
const stringMap: Observable<string> = emitter3.pipe(
  map((value: number) => {
    return value * 2;
  }),
  map((value: number) => {
    return `str_${value}`;
  })
);
stringMap.subscribe((value: string) => {
  console.log(`stringMap emitted: ${value}`);
});

// Avoid Swallowing Values
const emitOneTwo = of(1, 2);
const swallowedValues = emitOneTwo.pipe(
  map((value: number) => {
    console.log(`swallowing ${value}`);
    // Not retuning a value

    // However, if we really want to sometimes return nothing, it is much better to return null:
    if (value < 2) {
      return null;
    }
    return value;
  })
);
// Failing to return a value will automatically make the entire Observable return a type of unknown.
swallowedValues.subscribe((value: number | null) => {
  console.log(`subscriber received value: ${value}`);
});

// Time based Observables
const sourceInterval = interval(1000);
const fiveNumbers = sourceInterval.pipe(
  // the take function has a single parameter, which is the number of Observables to take. In this case, we chose 5 so we get observables: 0,1,2,3,4
  take(5),
  map((value: number) => {
    console.log(`map received : ${value}`);
    return `string_${value * 2}`;
  })
);
// Being that sourceInterval is an interval of 1 second, it will take a number each second, map it, and then print it. It will do this 5 times because we specified that with take(5)
fiveNumbers.subscribe((value: string) => {
  console.log(`${new Date().toLocaleTimeString()} ${value}`);
});
