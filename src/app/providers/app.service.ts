import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import {
  FranceGlobalLiveData,
  FranceGlobalLiveDataResponse,
  SOURCE_TYPE,
} from '../interfaces/france-global-data';

const ROOT_API = 'https://coronavirusapi-france.now.sh';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getFranceLiveGlobalData(
    sourceType: SOURCE_TYPE
  ): Observable<FranceGlobalLiveData> {
    const apiUrl = `${ROOT_API}/FranceLiveGlobalData`;

    return this.http
      .get<FranceGlobalLiveDataResponse>(apiUrl)
      .pipe(
        map((response) =>
          response.FranceGlobalLiveData.find(
            (data) =>
              data.sourceType === sourceType || response.FranceGlobalLiveData[0]
          )
        )
      );
  }

  getLiveDataByDepartement(
    departementName: string,
    sourceType?: SOURCE_TYPE
  ): Observable<FranceGlobalLiveData> {
    const apiURL = `${ROOT_API}/LiveDataByDepartement?Departement=${departementName}`;

    return this.http
      .get<{ LiveDataByDepartement: FranceGlobalLiveData[] }>(apiURL)
      .pipe(
        map(
          (response) =>
            response.LiveDataByDepartement.find(
              (data) => data.sourceType === sourceType
            ) || response.LiveDataByDepartement[0]
        )
      );
  }

  getLiveDataByDate(
    date: string,
    departementName: string,
    sourceType?: SOURCE_TYPE
  ): Observable<FranceGlobalLiveData> {
    const apiUrl = `${ROOT_API}/AllDataByDate?date=${date}`;

    return this.http
      .get<{ allFranceDataByDate: FranceGlobalLiveData[] }>(apiUrl)
      .pipe(
        map(
          (response) =>
            response.allFranceDataByDate
              .filter((data) => data.nom === departementName)
              .find((data) => data.sourceType === sourceType) ||
            response.allFranceDataByDate[0]
        )
      );
  }
}
