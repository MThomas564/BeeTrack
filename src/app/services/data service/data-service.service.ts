import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { Hive } from 'src/shared/hive';
import { Inspection } from 'src/shared/inspection';
import { InspectionNote } from 'src/shared/inspectionNote';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private hiveRepo = remult.repo(Hive);
  private inspectionRepo = remult.repo(Inspection);
  private inspectionNoteRepo = remult.repo(InspectionNote);

  constructor() { }

  async newHive(hive: Partial<Hive>){
    return await this.hiveRepo.insert(hive);
  }

  async getHive(id: string) {
    return await this.hiveRepo.find({where:{id:id}});
  }

  async getHives(){
    return await this.hiveRepo.find();
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
    return await this.inspectionNoteRepo.find({where: {hive: hive}});
  }

  async getInspection(id: string){
    return await this.inspectionRepo.findId(id, {include: {inspectionNotes: true}});
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
