export interface CandidatureForRecruteur {
  id: number;
  status: string;
  dateSoumission: Date;
  idOffre: number;
  emploi: string;
  idCandidat: number;
  nomImage: string;
  cv: any
  nom: string;
  prenom: string;
  tel: string;
  score: number;
  
  competences: string[];
  experienceProf: string;
  diplomes: string[];
  idcondidature: number;
  date: String;
  Horaire: string;
  meet: string;

}