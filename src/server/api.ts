import { remultExpress } from "remult/remult-express"
import { createPostgresDataProvider } from "remult/postgres"


import { Hive } from "../shared/hive"
import { Inspection } from "../shared/inspection"
import { InspectionNote } from "../shared/inspectionNote"

const dbHost = process.env['POSTGRES_HOST']
const dbPort = process.env['POSTGRES_PORT']
const dbUser = process.env['POSTGRES_USER']
const dbPass = process.env['POSTGRES_PASSWORD']
const dbName = process.env['POSTGRES_DB']

const conString = `postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
console.log(conString);

export const api = remultExpress({
  dataProvider: createPostgresDataProvider({
    connectionString: conString
  }),
    entities: [Hive, Inspection, InspectionNote],
    admin: true
  })