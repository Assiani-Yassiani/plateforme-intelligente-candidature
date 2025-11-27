import { Component, OnInit } from '@angular/core';
import { OffreService } from '../_services/offre.service';
import { OffreRequest } from '../model/offre.request';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../_helpers/custom-validators';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
@Component({
  selector: 'app-offre-form',
  templateUrl: './offre-form.component.html',
  styleUrls: ['./offre-form.component.css']
})
export class OffreFormComponent implements OnInit {
  form!: FormGroup;
  error = '';
  status = '';
  message = '';
  date1!: Date;
  dates!: Date[];

  rangeDates!: Date[];

  minDate!: Date;

  maxDate!: Date;

  es: any;
  date: any

  invalidDates!: Array<Date>
  offre!: OffreRequest;
  submitted = false;
  selectedValues: any;
  hasQueryParams: boolean = false;
  accumulatedCompetences: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private offreService: OffreService,
    public customValidators: CustomValidators,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    

    const queryParams = this.route.snapshot.queryParams;
    this.hasQueryParams = Object.keys(queryParams).length > 0;

    this.form = this.formBuilder.group({



      typeContrat: ['', Validators.required],

      postesVacants: ['', Validators.required],
      desc1: ['', Validators.required],
      desc2: ['', Validators.required],
      desc3: ['', Validators.required],
      competences: ['', Validators.required],

      diplome: ['', Validators.required],
      domaine: ['', Validators.required],
      experienceProf: ['', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  changeDomaine(e: any) {

    this.form.get('domaine')?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeDiplome(e: any) {

    this.form.get('diplome')?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeExp(e: any) {
    console.log("e", e.target.value)

    this.form.get('experienceProf')?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeType(e: any) {
    console.log(e.target.value);
    this.form.get('typeContrat')?.setValue(e.target.value, {
      onlySelf: true
    });
  }





  changeCompetences(e: Event) {
    const target = e.target as HTMLSelectElement;
    const selectedValuesArray = Array.from(target.selectedOptions, (option: HTMLOptionElement) => option.value);

    // Ajouter les nouvelles compétences sélectionnées à la liste existante
    this.accumulatedCompetences.push(...selectedValuesArray);

    // Supprimer les doublons
    this.accumulatedCompetences = Array.from(new Set(this.accumulatedCompetences));

    // Joindre les valeurs en une seule chaîne de caractères, séparées par des virgules
    const accumulatedCompetencesString = this.accumulatedCompetences.join(', ');

    console.log(accumulatedCompetencesString);

    // Mettre à jour le champ 'competences' dans le formulaire avec la chaîne de caractères accumulée
    this.form.get('competences')?.setValue(accumulatedCompetencesString, {
      onlySelf: true
    });

  }
  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  convertString(input: any) {
    // Supprimer les indices et les deux-points
    const cleanedString = input.replace(/\d+: '/g, "").replace(/'/g, "");

    // Séparer les mots par des virgules et les joindre en une seule chaîne
    const result = cleanedString.split(', ').join(' ');

    return result;
  }

  onSubmit(): void {
    this.date = new Date()

    this.submitted = true;
    console.log(this.form.value.desc1)

    const queryParams = this.route.snapshot.queryParams;
    const offreId = queryParams['offreId'];

    this.offre = {
      datePublication: new Date(),
      dateExpiration: this.addDays(this.date, 30),
      typeContrat: this.form.value.typeContrat,
      postesVacants: this.form.value.postesVacants,
      desc1: this.form.value.desc1,
      desc2: this.form.value.desc2,
      desc3: this.form.value.desc3,
      competences: this.convertString(this.form.value.competences),

      diplome: this.form.value.diplome,
      domaine: this.form.value.domaine,
      experienceProf: this.form.value.experienceProf,
    };
    console.log()
    console.log(this.offre)

    if (offreId) {
      console.log(offreId)


      this.offreService.updateOffre(offreId, this.offre).subscribe({
        next: data => {
          console.log(data)

        }
      });
      this.router.navigate(['offresemploi']);
    } else {

      this.offreService.createOffre(this.offre).subscribe({
        next: data => {
          this.router.navigate(['create-test-technique', data.id]);
        },
        error: err => {
          console.log('Failed to create offre:' + err);
          this.message = err.error.message;
          this.error = err.error.error;
          this.status = err.error.status;
        }
      });
    }
  }
}