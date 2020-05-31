import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators';
import { IndiaDataSet } from './model/IndiaDataSet';
import { DisasterDataSet } from './model/DisasterDataSet';
import { UnitedStatesDataSets } from './model/UnitedStatesDataSet';
import { StateInfo } from './model/stateInfo';

@Injectable({
  providedIn: 'root'
})
export class DataSetService {

  baseUrl1:string;
  baseUrl2: string;
  baseUrl3:string;
  baseUrl4: string;
  constructor(private http: Http) {
    this.baseUrl1 = "http://localhost:9798/IndiaDataSet";
    this.baseUrl2 = "http://localhost:9798/disasterDataSet";
    this.baseUrl3 = "http://localhost:9798/unitedStatesDataSet";
    this.baseUrl4 = "http://localhost:9798/stateInfo";
   }

   getAllIndiaDataSet(): Observable<[IndiaDataSet]> {
    return this.http.get(this.baseUrl1).pipe(
      map(data => data.json())
    );
  }

  getAllDiasaterDataSet(): Observable<[DisasterDataSet]> {
    return this.http.get(this.baseUrl2).pipe(
       map(data => data.json())
    );
  }

  getAllUnitedStatesDataSet(): Observable<[UnitedStatesDataSets]> {
    return this.http.get(this.baseUrl3).pipe(
      map(data => data.json())
   );
  }

  getAllStatesInfo():Observable<[StateInfo]> {
    return this.http.get(this.baseUrl4).pipe(
      map(data => data.json())
   );
  }
}
