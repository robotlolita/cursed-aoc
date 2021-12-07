import type { Add } from "./add";
import type { Sub } from "./sub";
import type { ParseInt } from "./parse-int";
import type { ValidNumber } from "./ints";
export { Add, Sub, ParseInt, ValidNumber };

export type ParseLines<Str extends string> =
  Str extends `${infer Line}\n${infer Rest}`
    ? [Line, ...ParseLines<Rest>]
    : Str extends ""
    ? []
    : Str extends `${infer Line}`
    ? [Line]
    : never;

export type ParseInts<Strs> = Strs extends [infer A, ...infer Rest]
  ? [ParseInt<ToStr<A>>, ...ParseInts<Rest>]
  : Strs extends []
  ? []
  : never;

const emptyNats: number[] = [];
export type ToStr<A> = A extends string ? A : "";
export type ToNat<A> = A extends number ? A : -1;
export type ToNats<A> = A extends number[] ? A : typeof emptyNats;

export type Cmp<A extends number, B extends number> = Sub<A, B> extends -1
  ? -1
  : Sub<A, B> extends 0
  ? 0
  : 1;

export type Lt<A extends number, B extends number> = Cmp<A, B> extends -1
  ? true
  : false;
export type Lte<A extends number, B extends number> = Cmp<A, B> extends -1 | 0
  ? true
  : false;

export type Eq<A extends number, B extends number> = Cmp<A, B> extends 0
  ? true
  : false;

export type Gt<A extends number, B extends number> = Cmp<A, B> extends 1
  ? true
  : false;
export type Gte<A extends number, B extends number> = Cmp<A, B> extends 1 | 0
  ? true
  : false;
