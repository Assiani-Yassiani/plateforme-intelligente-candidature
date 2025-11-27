import { Component, OnInit } from '@angular/core';
import { TestteschniqueService } from '../_services/testteschnique.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  testResults: any;
  testTransformed: Array<[string, Array<[string, boolean]>]> = [];
  userResponses: { [key: string]: { [key: string]: boolean } } = {};
  score: number = 0;

  constructor(private testTechniqueService: TestteschniqueService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const offreId = params['id'];
      this.testTechniqueService.getTest(offreId).subscribe(data => {
        console.log(data);
        this.testResults = data;
        this.transformTestResults();
      });
    });
  }

  isObject(obj: unknown): obj is Record<string, boolean> {
    return obj !== null && typeof obj === 'object';
  }

  transformTestResults(): void {
    const testObj = JSON.parse(this.testResults.test);
    this.testTransformed = Object.entries(testObj).map(([question, options]) => {
      if (this.isObject(options)) {
        this.userResponses[question] = {};
        Object.keys(options).forEach(option => {
          this.userResponses[question][option] = false;
        });
        return [question, Object.entries(options)] as [string, Array<[string, boolean]>];
      }
      return [question, []] as [string, Array<[string, boolean]>];
    });
  }

  onOptionChange(question: string, option: string, event: any): void {
    this.userResponses[question][option] = event.target.checked;
  }

  calculateScore(): void {
    let totalScore = 0;

    this.testTransformed.forEach(([question, options]) => {
        let questionScore = 0;
        let allCorrect = true;

        options.forEach(([option, isCorrect]) => {
            const isSelected = this.userResponses[question][option];
            if (isSelected && !isCorrect) {
                allCorrect = false;
            }
            if (isCorrect && isSelected) {
                questionScore++;
            }
        });

        if (allCorrect) {
            totalScore += questionScore;
        }
    });

    this.score = totalScore;

    // Envoyer le score au serveur
    const offreId = this.route.snapshot.params['idp'];
    this.testTechniqueService.scors(offreId, this.score).subscribe(response => {
        console.log('Score mis à jour avec succès', response);
        this.redirectToOffreEmploi();
    }, error => {
        console.error('Erreur lors de la mise à jour du score', error);
    });
  }

  redirectToOffreEmploi() {
    setTimeout(() => {
      this.router.navigate(['offresemploi']);
    }, 2500); // 2.5 seconds delay
  }
}
