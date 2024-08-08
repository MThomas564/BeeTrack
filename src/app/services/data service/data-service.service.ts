import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { Hive } from 'src/shared/hive';
import { Inspection } from 'src/shared/inspection';
import { InspectionNote } from 'src/shared/inspectionNote';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private hiveRepo = remult.repo(Hive);
  private inspectionRepo = remult.repo(Inspection);
  private inspectionNoteRepo = remult.repo(InspectionNote);

  constructor() { }

  async addHive(hive: Partial<Hive>){
    return await this.hiveRepo.insert(hive);
  }

  async getHive(id: string) {
    return await this.hiveRepo.findId(id);
  }

  async getHives(){
    return await this.hiveRepo.find();
  }

  async getArchivedHives(){
    return await this.hiveRepo.find({where: {archived: true}})
  }

  async getActiveHives(){
    return await this.hiveRepo.find({where : {archived: false}});
  }

  async deleteHiveDndInspectionNotes(id: string){
    const hive = await this.hiveRepo.find({where :{id:id}});
    const inspections = await this.inspectionNoteRepo.find({where: {hive: hive[0]}});
    inspections.forEach(async (inspect) => {
      await this.inspectionNoteRepo.delete(inspect.id);
    })
    return await this.hiveRepo.delete(id);
  }

  async updateHive(hive:Hive){
    await this.hiveRepo.update(hive.id, hive);
  }

  async getInspectionNotesByHive(id: string){
    const hive = await this.hiveRepo.findId(id)
    const inspectNotes = await this.inspectionNoteRepo.find({where: {hive: hive}});
    return inspectNotes.sort((a,b) => b.inspection.inspectionDate!.getTime() - a.inspection.inspectionDate!.getTime());
  }

  async getInspectionNotesSortedByInspectionDate(id: string) {
    // Fetch all inspection notes for the given beeHiveId
    const hive = await this.hiveRepo.findId(id)
    const inspectionNotes = await this.inspectionNoteRepo.find({
      where: { hive: hive}
    });

    // Fetch related inspections
    const inspections = await this.inspectionRepo.find({
      where: {
        id: { $in: inspectionNotes.map(note => note.inspection.id) }
      }
    });

    const inspectionMap = new Map(inspections.map(ins => [ins.id, ins.inspectionDate]));

    // Add inspectionDate to inspectionNotes
    inspectionNotes.forEach(note => {
      note['inspection'].inspectionDate = inspectionMap.get(note.inspection.id);
    });

    // Sort by inspectionDate in descending order
    inspectionNotes.sort((a, b) => (b['inspection'].inspectionDate! > a['inspection'].inspectionDate! ? 1 : -1));

    return inspectionNotes;
  }

  async getInspection(id: string){
    return await this.inspectionRepo.findId(id, {include: {inspectionNotes: true}});
  }

  async getInspections(){
    return await this.inspectionRepo.find({orderBy: {inspectionDate: "desc"}});
  }

  async addInspection(inspection: Partial<Inspection>){
    return await this.inspectionRepo.insert(inspection);
  }

  async addInspectionNote(inspectNote: Partial<InspectionNote>){
    return await this.inspectionNoteRepo.insert(inspectNote);
  }

  async addInspectAndNotes(inspect: Partial<Inspection>, inspectNotes: Partial<InspectionNote>[]){
    const newInpsect = await this.inspectionRepo.insert(inspect);

    inspectNotes.forEach(async (item) => {
      await this.inspectionRepo.relations(newInpsect).inspectionNotes.insert(item);
    });

    return newInpsect;
  }
}
