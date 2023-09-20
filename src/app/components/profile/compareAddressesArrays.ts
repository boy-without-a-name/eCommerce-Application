import { IAddress } from 'src/app/models/interface/address.interface';

export function compareAddressesArrays(arr1: IAddress[], arr2: IAddress[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // exclude key "type", then compare
  const sortedArr1 = arr1
    .map((obj) => {
      const { type, ...rest } = obj;
      return rest;
    })
    .sort((a, b) => (JSON.stringify(a) > JSON.stringify(b) ? 1 : -1));

  const sortedArr2 = arr2
    .map((obj) => {
      const { type, ...rest } = obj;
      return rest;
    })
    .sort((a, b) => (JSON.stringify(a) > JSON.stringify(b) ? 1 : -1));

  for (let i = 0; i < sortedArr1.length; i++) {
    const obj1 = sortedArr1[i];
    const obj2 = sortedArr2[i];

    if (JSON.stringify(obj1) !== JSON.stringify(obj2)) {
      return false;
    }
  }

  return true;
}
