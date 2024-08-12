import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { Harvest } from 'src/shared/harvest';
import { HarvestToHives } from 'src/shared/HarvestToHive';
import { Hive } from 'src/shared/hive';
import { Inspection } from 'src/shared/inspection';
import { InspectionNote } from 'src/shared/inspectionNote';
import { JarSale } from 'src/shared/jarSale';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private hiveRepo = remult.repo(Hive);
  private inspectionRepo = remult.repo(Inspection);
  private inspectionNoteRepo = remult.repo(InspectionNote);
  private harvestRepo = remult.repo(Harvest);
  private harvestHiveRepo = remult.repo(HarvestToHives);
  private jarSaleRepo = remult.repo(JarSale);

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

  async addHoneyHarvest(harvest: Partial<Harvest>, hives: Hive[]){
    const h = await this.harvestRepo.insert(harvest);
    hives.forEach(async (element) => {
      await this.harvestHiveRepo.insert({harvestId: h.id, hiveId: element.id})
    });
  }

  async getHarvests(){
    return this.harvestRepo.find({orderBy:{collectedDate: "desc"}});
  }

  async getHarvest(id: string): Promise<[Harvest, Hive[]]>{
    const harvest = await this.harvestRepo.findId(id);
    let hiveHarvests = await this.harvestHiveRepo.find({where: {harvestId: harvest.id}})
    const hives:Hive[] = [];
    hiveHarvests.forEach(async (item) => {
      let h = await this.hiveRepo.findId(item.hiveId);
      hives.push(h);
    })
    return [harvest, hives];
  }

  async getHarvestsByHive(id:string){
    const h = await this.hiveRepo.findId(id);
    console.log(h);
    const hToH = await this.harvestHiveRepo.find({where: {hiveId: h.id}});
    const harvestIds = hToH.map(o => o.harvestId)
    const harvests = await this.harvestRepo.find({where:{id: {$in: harvestIds}}});
    return harvests;
  }

  async updateHarvest(harvest:Harvest, hives:Hive[]){
    const h = await this.harvestRepo.findId(harvest.id);
    await this.harvestRepo.update(h.id, harvest);
    let harvestToHives = await this.harvestHiveRepo.find({where:{harvestId: h.id}});
    const hivesToAdd = hives.filter(itemIn => !harvestToHives.some(item => item.hiveId === itemIn.id));
    const hivesToRemove = harvestToHives.filter(item => !hives.some(inItem => inItem.id === item.hiveId))
    hivesToAdd.forEach(async (item) => {
      await this.harvestHiveRepo.insert({harvestId: h.id, hiveId: item.id});
    })
    hivesToRemove.forEach(async (item) => {
      await this.harvestHiveRepo.delete(item);
    })
  }

  async getJarSales(){
    return await this.jarSaleRepo.find({orderBy:{dateOfSale: "desc"}});
  }

  async addSale(sale: Partial<JarSale>){
    return await this.jarSaleRepo.insert(sale);
  }

  async getJarSale(id:string){
    return await this.jarSaleRepo.findId(id);
  }

  async getTotalJarsSold(){
    var sales = await this.jarSaleRepo.find();
    let count = 0;
    sales.forEach((item) => {
      count += item.numberOfJars
    })
    return count;
  }

  async updateSale(sale:JarSale){
    await this.jarSaleRepo.update(sale.id, sale);
  }

}