import { Entity, Fields, Relations } from "remult";
import { InspectionNote } from "./inspectionNote";

@Entity('jarsales', {
    allowApiCrud: true,
})
export class JarSale {
    @Fields.cuid()
    id = ''

    @Fields.date()
    dateOfSale?:Date

    @Fields.number()
    numberOfJars = 0

    @Fields.string()
    notes?: string

    @Fields.createdAt()
    createdDate?: Date
}