import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Departement } from '../interfaces/departement';

@Injectable({
  providedIn: 'root',
})
export class DepartementService {
  constructor(private http: HttpClient) {}

  getDepartementList(): Observable<Departement[]> {
    return this.http.get<Departement[]>('./assets/data/departements.json');
  }

  getDepartementsByName(name: string): Observable<Departement[]> {
    return this.getDepartementList().pipe(
      map((departements) =>
        departements.filter(
          (departement) =>
            formatString(departement.NOM).includes(formatString(name)) ||
            formatString(departement.NUMERO.toString()).includes(
              formatString(name)
            )
        )
      )
    );
  }
}

function formatString(char: string): string {
  return char.toLocaleLowerCase().replace('-', ' ');
}
