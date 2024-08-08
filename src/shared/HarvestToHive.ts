import { Entity, Fields, Relations } from "remult";
import { Hive } from "./hive";

@Entity('harvestsToHives', {
    allowApiCrud: true,
    id: {
        hiveId: true,
        harvestId: true
    }
})

export class HarvestToHives {
    @Fields.string()
    hiveId = ''
    @Fields.string()
    harvestId = ''
}