import { Entity, Fields, Relations } from "remult";
import { Hive } from "./hive";

@Entity('inspections', {
    allowApiCrud: true,
})
export class Inspection {
    @Fields.cuid()
    id = ''

    @Fields.string()
    notes = ''

    @Fields.createdAt()
    createdDate?: Date

    @Relations.toOne(() => Hive)
    hive?: Hive
}