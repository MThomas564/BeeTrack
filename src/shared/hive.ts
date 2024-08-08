import { Entity, Fields, Relations, Validators } from "remult";
import { Inspection } from "./inspection";
import { InspectionNote } from "./inspectionNote";
import { Harvest } from "./harvest";

@Entity('hives', {
    allowApiCrud: true,
})
export class Hive {
    @Fields.cuid()
    id = ''

    @Fields.string({
        validate: Validators.required
    })
    name = ''

    @Fields.string()
    origin = ''

    @Fields.createdAt()
    createdDate?: Date

    @Fields.string()
    yearOfQueen = ''

    @Fields.boolean()
    archived = false

    @Relations.toMany(() => InspectionNote, {defaultIncluded: true})
    inspections?: InspectionNote[]

}