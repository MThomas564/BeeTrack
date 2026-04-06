import { Entity, Fields, Relations, Validators } from "remult";
import { Hive } from "./hive";
import { HarvestToHives } from "./HarvestToHive";

@Entity('harvests', {
    allowApiCrud: true,
})
export class Harvest {
    @Fields.cuid()
    id = ''

    @Fields.string()
    notes= ''

    @Fields.date()
    collectedDate?: Date

    @Fields.date()
    jarDate?: Date

    @Fields.number()
    frameCount = 0

    @Fields.number()
    poundsCollected = 0

    @Fields.number()
    jars = 0

    @Fields.createdAt()
    createdDate?: Date

}