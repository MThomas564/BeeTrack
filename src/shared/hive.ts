import { Entity, Fields, Relations, Validators } from "remult";
import { Inspection } from "./inspection";

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

    @Relations.toMany(() => Inspection)
    inspections?: Inspection[]
}