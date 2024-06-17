import { Entity, Field, Fields, Relations } from "remult";
import { Hive } from "./hive";
import { Inspection } from "./inspection";

@Entity('inspectionNotes', {
    allowApiCrud: true,
})

export class InspectionNote{
    @Fields.cuid()
    id = ''

    @Fields.string()
    notes = ''

    @Fields.boolean()
    queen = false
    @Fields.boolean()
    eggs = false
    @Fields.boolean()
    bias = false
    @Fields.boolean()
    swarmCells = false
    @Fields.boolean()
    supercedureCells = false
    @Fields.boolean()
    noEggsOrBrood = false

    @Fields.createdAt()
    createdDate?: Date

    @Relations.toOne(() => Inspection, {defaultIncluded: true})
    inspection!: Inspection

    @Relations.toOne(() => Hive, {defaultIncluded: true})
    hive!: Hive
}
