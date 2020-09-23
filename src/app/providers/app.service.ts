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
            (data) => data.sourceType === sourceType
          )
        )
      );
  }
}
