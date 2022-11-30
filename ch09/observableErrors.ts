// What happens when something goes wrong with an Observable stream? We must use error handling to catch them!

import { catchError, map, Observable, of } from "rxjs";

interface Value {
  value: number;
}
interface NestedObj {
  id?: Value;
}

const objEmit: Observable<NestedObj> = of(
  { id: { value: 1 } },
  // This empty value will cause the stream to crash if we don't include error handling!
  {},
  { id: { value: 2 } }
);
const returnedIdValue = objEmit.pipe(
  map((value: NestedObj) => {
    return value.id!.value;
  })
);
returnedIdValue.subscribe({
  // next is called for each observable in the stream
  next: (value: number | null) => {
    console.log(`received ${value}`);
  },
  // error is called when there's an error (think try/catch)
  error: (error: unknown) => {
    console.log(`error: ${error}`);
  },
  // complete is called when the stream completes successfully
  complete: () => {
    console.log(`complete`);
  },
});

// The above is used to catch errors within the stream, HOWEVER, in our case the error is caused before it hits the stream. In that case we want to use:
// catchError
// We can use catchError while we pipe
const returnIdValueFIXED = objEmit.pipe(
  map((value: NestedObj) => {
    return value!.id!.value;
  }),
  catchError((error: unknown) => {
    console.log(`stream caught : ${error}`);
    return of(null);
  })
);
// This will turn the value into null. It will catch the error when it passes in the stream, and then handle that error (in this case turning returning null instead), and then stop the stream. In our case, the final observer will not emit as the stream has successfully stopped after handling the error
