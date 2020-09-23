export interface FranceGlobalLiveDataResponse {
  FranceGlobalLiveData: FranceGlobalLiveData[];
}

export interface FranceGlobalLiveData {
  date: string;
  source: Source;
  sourceType: SOURCE_TYPE;
  casConfirmes?: number;
  deces: number;
  decesEhpad?: number;
  hospitalises: number;
  reanimation: number;
  gueris: number;
  casConfirmesEhpad?: number;
  nouvellesHospitalisations: number;
  nouvellesReanimations: number;
  nom: string;
  code: string;
}

export interface Source {
  nom: string;
}

export enum SOURCE_TYPE {
  MIN_SANTE = 'ministere-sante',
  OPENCOVID19 = 'opencovid19-fr',
}
