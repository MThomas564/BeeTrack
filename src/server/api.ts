import { remultExpress } from "remult/remult-express"

import { Hive } from "src/shared/hive"
import { Inspection } from "src/shared/inspection"
import { InspectionNote } from "src/shared/inspectionNote"

export const api = remultExpress({
    entities: [Hive, Inspection, InspectionNote],
    admin: true
  })