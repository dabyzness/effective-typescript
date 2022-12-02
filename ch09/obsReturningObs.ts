// Quite often we need to return observables from observables
// Example: We receive an observable that is an array of products
// Then we need to receive observables on each of the products

import { from, map, mergeMap, Observable, of } from "rxjs";

interface ProductId {
  id: number;
}
interface ProductDescription {
  name: string;
  description: string;
}

const porductList = <Observable<ProductId>>(
  from([{ id: 1 }, { id: 2 }, { id: 3 }])
);
function getProductName(id: number): Observable<ProductDescription> {
  return of({
    id: id,
    name: `Product_${id}`,
    description: `Description_${id}`,
  });
}

porductList
  .pipe(
    map((value: ProductId) => {
      console.log(`Product id: ${value.id}`);
      return getProductName(value.id);
    })
  )
  .subscribe((value: Observable<ProductDescription>) => {
    value.subscribe((value: ProductDescription) => {
      console.log(`product name: ${value.name}`);
      console.log(`product desc: ${value.description}`);
    });
  });
// In the above case we're taking product list --> mapping each product to getProductName --> doing something with it
// The inner observable can be optimized by using something called:
// MERGE MAP
// whish is used to retun a single value from an Observable stream, so that we do not need to subscribe to the inner Observable
porductList
  .pipe(
    mergeMap((value: ProductId): Observable<ProductDescription> => {
      console.log(`Product id: ${value?.id}`);
      return getProductName(value.id);
    })
  )
  .subscribe((value: ProductDescription) => {
    console.log(`product name: ${value.name}`);
    console.log(`product desc: ${value.description}`);
  });
