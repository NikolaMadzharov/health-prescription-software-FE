import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {medicineEndpoint} from "../constants";
import {CacheService} from "./cache.service";

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(
    private HttpClient:HttpClient,
    private CacheService:CacheService,
  ) { }

  getMedicine(id:string){
    return this.HttpClient.get(medicineEndpoint+`/${id}`)
  }
  deleteMedicament(id:string){
    this.HttpClient.delete("api/", {body:id}).subscribe(
      (res)=>{
        const index = this.CacheService.allMedicinesAdded.findIndex((el:any)=>el.id===id)
        this.CacheService.allMedicinesAdded.splice(index,1)
      },
      (error)=>{
        console.log(error)
      }
    )

  }
}
