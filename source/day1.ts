import type { Add, Lt, ParseInts, ParseLines, ToNat } from "./prelude";

type input = `199
200
208
210
200
207
240
269
260
263`;

type parsed_input = ParseInts<ParseLines<input>>;
// [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

type DoSolve<R extends number, A extends number, In> = In extends []
  ? R
  : In extends [infer B, ...infer Rest]
  ? Lt<ToNat<A>, ToNat<B>> extends true
    ? DoSolve<Add<R, 1>, ToNat<B>, Rest>
    : DoSolve<R, ToNat<B>, Rest>
  : never;

type Solve<In extends number[]> = In extends [infer A, ...infer Rest]
  ? DoSolve<0, ToNat<A>, Rest>
  : never;

const result: Solve<parsed_input> = 7;
