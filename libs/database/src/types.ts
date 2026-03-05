import { DB } from "./db";

export type Tx = Parameters<DB['transaction']>[0] extends (tx: infer T) => any
  ? T
  : never;
  