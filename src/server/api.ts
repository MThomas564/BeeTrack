import { remultExpress } from "remult/remult-express"

import { Hive } from "src/shared/hive"

export const api = remultExpress({
    entities: [Hive],
    admin: true
  })