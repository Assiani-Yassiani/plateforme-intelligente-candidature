import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { OffreService } from '../_services/offre.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OffreDto } from '../model/offre.dto';
import { OffreRequestDto } from '../model/offre.request.dto';


@Component({
  selector: 'app-offres-emploi',
  templateUrl: './offres-emploi.component.html',
  styleUrls: ['./offres-emploi.component.css']
})
export class OffresEmploiComponent implements OnInit {
  form!: FormGroup;
  form2!: FormGroup;
  showRecruteurButton: boolean = false;
  request!: OffreRequestDto
  domaine: any;
  diplome: any;
  exp: any;
  type: any;
  showModal = false;
  errorMessage = '';
  error = '';
  status = '';
  selectedFilter!: string;
  selectedCardId: number | null = null;
  offreData: OffreDto[] = [];
  selectedValues: any = {};
  role: string = this.tokenStorageService.getUser().role;
  showAdvancedSearch: boolean = false;
  searchInputValue: string = '';
  constructor(
    private tokenStorageService: TokenStorageService,
    private offreService: OffreService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.request = {
      typeContrat: '',
      expProf: '',
      domaine: '',
      diplome: '',
      searchText: '',
      status: ''
    }
    this.showRecruteurButton = this.role === 'recruteur';

    this.form = this.formBuilder.group({
      search: ''
    });
    this.form2 = this.formBuilder.group({
      typeContrat: '',
      expProf: '',
      domaine: '',
      diplome: ''
    });

    this.offreService.getAllOffre(0, 10, 'id', 'desc', this.request).subscribe({
      next: (data) => {

        this.offreData = data.content;
      },
      error: (err) => {

        this.errorMessage = err.error.message;
        this.error = err.error.error;
        this.status = err.error.status;
      }
    });
  }

  changeDomaine(e: any) {
    console.log(e.target.value);
    this.form2.get('domaine')?.setValue(e.target.value, {
      onlySelf: true
    });
    //this.request.domaine = this.form2.get('domaine')?.value
    //console.log(this.request)
  }

  changeDiplome(e: any) {
    console.log(e.target.value);
    this.form2.get('diplome')?.setValue(e.target.value, {
      onlySelf: true
    });
    this.request.diplome = this.form2.get('diplome')?.value
    console.log(this.request)
  }

  changeExp(e: any) {
    console.log(e.target.value);
    this.form2.get('expProf')?.setValue(e.target.value, {
      onlySelf: true
    });
    this.request.expProf = this.form2.get('expProf')?.value
    console.log(this.request)
  }

  changeType(e: any) {
    console.log(e.target.value);
    this.form2.get('typeContrat')?.setValue(e.target.value, {
      onlySelf: true
    });
    this.request.typeContrat = this.form2.get('typeContrat')?.value
    console.log(this.request)
  }

  onSubmit(): void {

    const searchText = this.form.get('search')?.value;
    const typeContrat = this.form2.get('typeContrat')?.value;
    const diplome = this.form2.get('diplome')?.value;
    const domaine = this.form2.get('domaine')?.value;
    const expProf = this.form2.get('expProf')?.value;
    this.request.diplome = diplome
    this.request.typeContrat = typeContrat
    this.request.domaine = domaine
    this.request.expProf = expProf
    this.request.searchText = searchText
    console.log("domaine", domaine)
    console.log(this.request)
    this.offreService.getserch(domaine, diplome, typeContrat, expProf).subscribe(data => {
      this.offreData = data

    })



  }

  toggleModal(cardId: number) {
    this.selectedCardId = cardId;

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedCardId = null;
  }
  toggleAdvancedSearch() {


    this.showAdvancedSearch = !this.showAdvancedSearch;
    console.log(this.showAdvancedSearch)

    if (this.showAdvancedSearch) {
      this.searchInputValue = '';
      this.form.get('search')?.setValue('');

    }
  }
  deleteItem(): void {
    if (this.selectedCardId) {
      console.log(this.selectedCardId)
      this.offreService
        .deleteOffre(this.selectedCardId)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.offreService.getAllOffre(0, 10, 'id', 'desc', this.request).subscribe({
              next: (data) => {
        
                this.offreData = data.content;
              },
              error: (err) => {
        
                this.errorMessage = err.error.message;
                this.error = err.error.error;
                this.status = err.error.status;
              }
            });
          },
          error: (err) => {
            this.errorMessage = err.error.message;
            this.error = err.error.error;
            this.status = err.error.status;
          }
        });
        

      this.closeModal();
    }
  }
}