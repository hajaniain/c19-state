import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FranceGlobalLiveData,
  SOURCE_TYPE,
} from './interfaces/france-global-data';
import { AppService } from './providers/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'c19-state';
  franceLiveGlobalLiveData$: Observable<
    FranceGlobalLiveData
  > = this.appService.getFranceLiveGlobalData(SOURCE_TYPE.MIN_SANTE);

  constructor(private appService: AppService) {}
}
