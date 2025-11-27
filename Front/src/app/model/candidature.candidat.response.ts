export interface CandidatureForCandidat {
  id: number;
  status: string;
  dateSoumission: Date;

  date: String
  meet: String;
  horaire: String



  idc: number;
  datePublication: Date;
  dateExpiration: Date;
  typeContrat: string;
  postesVacants: number;
  competences: string[];
  diplome: string;
  domaine: string;
  experienceProf: string;
}