import { remultExpress } from "remult/remult-express"
import { createPostgresDataProvider } from "remult/postgres"


import { Hive } from "../shared/hive"
import { Inspection } from "../shared/inspection"
import { InspectionNote } from "../shared/inspectionNote"
import { Harvest } from "../shared/harvest"
import { HarvestToHives } from "../shared/HarvestToHive"

const dbHost = process.env['POSTGRES_HOST']
const dbPort = process.env['POSTGRES_PORT']
const dbUser = process.env['POSTGRES_USER']
const dbPass = process.env['POSTGRES_PASSWORD']
const dbName = process.env['POSTGRES_DB']

const conString = `postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
console.log(conString);

export const api = remultExpress({
  dataProvider: dbHost ? createPostgresDataProvider({
    connectionString: conString
  }): undefined,
    entities: [Hive, Inspection, InspectionNote, Harvest, HarvestToHives],
    admin: true
  })