import { remultExpress } from "remult/remult-express"

import { Hive } from "../shared/hive"
import { Inspection } from "../shared/inspection"
import { InspectionNote } from "../shared/inspectionNote"

export const api = remultExpress({
    entities: [Hive, Inspection, InspectionNote],
    admin: true
  })