import { takeCoverage } from "v8";

declare const CONTACT_EMAIL_ARRAY: string[];

interface Response {
  responseText: FailureMessage;
}
interface FailureMessage {
  failure: boolean | string;
  errorMessage?: string;
}

declare module ErrorHelper {
  function containsError(response: Response): boolean;
  function trace(message: Response | string): void;
}

// Declaration files use the declare and module keywords to define objects and namespaces.
// Declaration files allow us to use the same syntax everywhere we would in TypeScript to describe types.

// Function Overloading
declare function trace(arg: string | number | boolean);
declare function trace(arg: { id: number; name: string });

trace("trace with a string");
trace(true);
trace(1);
trace({ id: 1, name: "test" });

// Nested Namespaces
declare module FirstNamespace {
  module SecondNamespace {
    module ThirsNamespace {
      function log(msg: string);
    }
  }
}

// Classes
// Similar to defining an interface for it. We don't provide any implementations for functions, just that those functions are on it.
declare class myModuleClass {
  public print(): void;
}

// STtaic properties and functions
declare class MyModuleStatic {
  static print(): void;
  static id: number;
}

// Abstract classes
declare abstract class MyModuleAbstract {
  abstract print(): void;
}

// Generics
declare function sort<T extends number | string>(input: Array<T>): Array<T> {};

// Conditional Types
declare type stringOrNumberOrBoolean<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : never;

// Conditional Type Interface
declare type inferFromPropertyType<T> = T extends { id: infer U } ? U : never;
