import { ReponseDto } from "./reponse.dto";

export interface QuestionDto {
    idQuestion: number;
    description: string;
    score: number;
    reponses: ReponseDto[];
  }