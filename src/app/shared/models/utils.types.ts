import { AbstractControl } from '@angular/forms';

export type DateFormat = `${number}-${number}-${number}`;
export type Nullable<T> = T | null;
export type RecordSome<K, T> = { [C in keyof K]?: T };
export type KeyOf<T> = keyof T;
export type TypedForm<T> = { [C in keyof T]: AbstractControl };
