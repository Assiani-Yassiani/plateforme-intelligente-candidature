import { OffreDto } from "./offre.dto";

export interface ProfilDto {
    id: number;
    nomImage: string;
    nomCv: string;
    nom: string;
    prenom: string;
    region: string;
    tel: string;
    score: number;
    email: string;
    langues: string[];
    diplomes: string[];
    competences: string[];
    domaine: string;
    experienceProf: string;
    offres: OffreDto[];
}