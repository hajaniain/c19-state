import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Departement } from './interfaces/departement';
import {
  FranceGlobalLiveData,
  SOURCE_TYPE,
} from './interfaces/france-global-data';
import { AppService } from './providers/app.service';
import { DepartementService } from './providers/departement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'c19-state';

  departementFormControl: FormControl = new FormControl('');

  departements$: Observable<
    Departement[]
  > = this.departementService.getDepartementList();

  franceLiveGlobalLiveData$: Observable<FranceGlobalLiveData>;

  constructor(
    private appService: AppService,
    private departementService: DepartementService
  ) {
    this.initLiveData();
    this.departementControlChange();
  }

  initLiveData(): void {
    this.franceLiveGlobalLiveData$ = this.appService.getFranceLiveGlobalData(
      SOURCE_TYPE.MIN_SANTE
    );
  }

  departementControlChange(): void {
    this.departementFormControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((departementName) => {
        if (!departementName || departementName === '') {
          this.initLiveData();
        }
        this.departements$ = this.departementService.getDepartementsByName(
          departementName
        );
      });
  }

  selectDepartement(departement: Departement): void {
    this.franceLiveGlobalLiveData$ = this.appService.getLiveDataByDepartement(
      departement.NOM
    );
  }
}
