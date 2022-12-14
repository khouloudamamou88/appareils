import { Injectable } from '@angular/core';
import { Appareil } from '../models/appareil';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppareilService {

  appareils!: Appareil[];
  isAuth = false;
  constructor(private http: HttpClient) {
     this.chargerListAppareil().subscribe((listApp) => {
       //console.log(listApp);
       this.appareils = listApp;
    });
  }

  switchStatus(index:number) {
    if (this.appareils[index].status === 'allumé') {
      console.log('here')
      this.appareils[index].status = 'éteint';
    } else {
      this.appareils[index].status = 'allumé';
    }
  }

  allumerTout() {
    this.appareils.forEach((elem) => {
      elem.status = 'allumé'
    })
  }

  eteindreTout() {
    this.appareils.forEach((elem) => {
      elem.status = 'éteint'
    })
  }

   chargerListAppareil() : Observable<Appareil[]>{
    return this.http.get<Appareil[]>('http://localhost:3000/appareilsAPI');
  }
}
