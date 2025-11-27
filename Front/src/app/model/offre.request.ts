export interface OffreRequest {
    datePublication: Date;
    dateExpiration: Date;
    typeContrat: string;
    postesVacants: number;
    desc1: string;
    desc2: string;
    desc3: string;
    competences: string[];
   
    diplome: string;
    domaine: string;
    experienceProf: string;
  }