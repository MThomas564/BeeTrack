import { Entity, Fields, Relations } from "remult";
import { Hive } from "./hive";
import { InspectionNote } from "./inspectionNote";

@Entity('inspections', {
    allowApiCrud: true,
})
export class Inspection {
    @Fields.cuid()
    id = ''

    @Fields.string()
    notes = ''

    @Fields.date()
    inspectionDate?:Date

    @Fields.createdAt()
    createdDate?: Date

    @Relations.toMany(() => InspectionNote, {
        defaultIncluded: true,
    })
    inspectionNotes?: InspectionNote[]
}