import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidatureService } from '../_services/candidature.service';
import { EntretienService } from '../_services/entretien.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidatureForRecruteur } from '../model/candidature.recruteur.response';
@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.css']
})
export class CandidaturesComponent implements OnInit {
  date1!: Date;
  date7!: Date;
  
  value1!: string;
 
  
  dates!: Date[];

  rangeDates!: Date[];

  minDate!: Date;

  maxDate!: Date;

  es: any;

  invalidDates!: Array<Date>
  date = ""
  horaire = ""
  showModal = false;
  showForm = false;
  form!: FormGroup;
  idCandidature!: number;
  showDetailEntretien = false;
  candidatureForm!: FormGroup;
  error = '';
  status = '';
  statuts !:any;
  message = '';
  entretienData: any;

  candidatureData: any = [];
  offreId?: number
  idc: any

  constructor(private formBuilder: FormBuilder, public router: Router,
    private route: ActivatedRoute,
    private candidautreService: CandidatureService,
    private entretienService: EntretienService,
  ) {
    this.route.params.subscribe(params => {
      this.offreId = params['id'];
    });
  }


  getCondidature() {
    if (this.offreId) {
      console.log(this.offreId)

      this.candidautreService.getAllCandidatureForRecruteur(undefined, 11, undefined, undefined, this.offreId).subscribe({
        next: data => {
          console.log(data)

          const filteredData = data.content.filter(candidature =>
            candidature.status == 'acceptée' || candidature.status == 'en cours'
          );

          this.candidatureData = filteredData.sort((a, b) => b.score - a.score);
        },
        error: err => {
          console.log('Failed to get candidature:' + err);
          this.message = err.error.message;
          this.error = err.error.error;
          this.status = err.error.status;
        }
      });
    }
  }

  ngOnInit(): void {
    this.getCondidature()
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
  }

  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = (month === 0) ? 11 : month -1;
  let prevYear = (prevMonth === 11) ? year - 1 : year;
  let nextMonth = (month === 11) ? 0 : month + 1;
  let nextYear = (nextMonth === 0) ? year + 1 : year;
  this.minDate = new Date();
  this.minDate.setMonth(prevMonth);
  this.minDate.setFullYear(prevYear);
  this.maxDate = new Date();
  this.maxDate.setMonth(nextMonth);
  this.maxDate.setFullYear(nextYear);

  let invalidDate = new Date();
  invalidDate.setDate(today.getDate() - 1);
  this.invalidDates = [today,invalidDate];

    this.form = this.formBuilder.group({

      date: ['', Validators.required],
      Horaire: ['', Validators.required],
      meet: ['', Validators.required]
    });

  }
  getcondidaturebyia(): any {

    this.candidautreService.condidaturebyia(this.offreId).subscribe(response => {
      console.log(response)
      this.candidatureData = response
      // Utilisez filteredData comme nécessaire ici
    });



  }
  onClick2(value: string): void {
    if (value == 'IA') {
      this.getcondidaturebyia()


    }
    else {
      this.getCondidature()

    }



  }
  // onClick(status: string): void {
  //   if (this.offreId) {
  //     this.candidautreService.getAllCandidatureForRecruteur(undefined, undefined, undefined, undefined, this.offreId).subscribe({
  //       next: data => {
  //         // Filter the data based on the status
  //         if (status === '') {
  //           // If status is empty, show all data
  //           this.getCondidature()
  //         } else {
  //           // Filter the data by the provided status
  //           this.candidatureData = data.content.filter((item: any) => item.status === status);
  //         }
  //       },
  //       error: err => {
  //         console.log('Failed to get candidature: ' + err);
  //         this.message = err.error.message;
  //         this.error = err.error.error;
  //         this.status = err.error.status;
  //       }
  //     });
  //   }
  // }
  

  get selectedStatus() {
    return this.candidatureForm.get('status')?.value;
  }

  toggleModal(candidatureId: number, idc: number) {
    console.log(candidatureId)
    this.showModal = true;
    this.idCandidature = candidatureId;
    this.idc = idc
    console.log(idc)
    this.candidatureForm = new FormGroup({
      status: new FormControl('')
    });


  }
  changeStatus(e: any) {

    this.candidatureForm.get('status')?.setValue(e.target.value, {
      onlySelf: true
    });
    console.log(e.target.value)
  }


  Status() {

    console.log(this.idCandidature)
   

 const status = this.candidatureForm.get('status')?.value;
    console.log(this.idCandidature)

    this.candidautreService
      .updateCandidatureStatus(this.idCandidature, status, undefined, undefined, undefined, this.idc)
      .subscribe({
        next: (data) => {
          this.getCondidature()
          console.log(data);
        },
        error: (err) => {
          console.log(err.error);
          this.message = err.error.message;
          this.error = err.error.error;
          this.status = err.error.status;
        }
      });
  
    this.showModal = false;
  }



  closeModal() {
    this.showModal = false;
  }



  toggleDeailEntretien(candidatureId: number, id: number) {
    this.idCandidature = candidatureId;
    this.idc = id
    console.log(candidatureId)
    this.entretienService
      .getEntretienByCandidatureId(candidatureId)
      .subscribe({
        next: (data) => {
          this.entretienData = data;
          console.log(data)
        },
        error: (err) => {
          this.message = err.error.message;
          this.error = err.error.error;
          this.status = err.error.status;
        }
      });
    this.showDetailEntretien = true;

  }

  closeDetailEntretien() {
    this.showDetailEntretien = false;
  }
  toggleForm() {
    this.showDetailEntretien = false;

    this.showModal = false;
    this.showForm = true;

  }
  closeForm() {
    this.showForm = false
  }
///////////////////////////////////////////////////////////////
formatDateAndTime(dateInput: string, timeInput: string) {
  // Format the date
  const dateObj = new Date(dateInput);
  const formattedDate = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + dateObj.getDate()).slice(-2);

  // Format the time
  const timeObj = new Date(timeInput);
  const formattedTime = `${('0' + timeObj.getHours()).slice(-2)}:${('0' + timeObj.getMinutes()).slice(-2)}`;

  return { formattedDate, formattedTime };
}



  //////////////////////////////////////////////////////////:
  Entretien() {
    console.log(this.form);
   
    
    let status = '';
    if (this.candidatureForm) {
      status = this.candidatureForm.get('status')?.value || 'acceptée';

    } else {
      status = 'acceptée';
    }
          console.log('hhh')
    // Extract date and time values from the form
    const dateInput = this.form.value.date;
    const timeInput = this.form.value.Horaire;
  
    // Format the date and time values
    const { formattedDate, formattedTime } = this.formatDateAndTime(dateInput, timeInput);
  
    // Update the Entretien using the formatted date and time
    this.candidautreService.updateCandidatureStatus(
      this.idCandidature,
      status,
      formattedDate,
      formattedTime,
      this.form.value.meet,
      this.idc
    ).subscribe({
      next: (data) => {
       
       
        console.log(data);
      },
      error: (err) => {
        this.message = err.error.message;
        this.error = err.error.error;
        this.status = err.error.status;
        this.getCondidature();
      }
    });
   
    this.showForm = false;
  }
  
  // Fonction pour convertir un blob Base64 en un Blob binaire
  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  pdf(base64Blob: any) {
    // Convertir le blob Base64 en un Blob binaire
    const blob = this.base64ToBlob(base64Blob, 'application/pdf');
    console.log(blob)
    // Créer un lien de téléchargement pour le blob
    const url = window.URL.createObjectURL(blob);

    // Créer un élément d'ancre et le déclencher pour démarrer le téléchargement
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cv.pdf'; // Spécifiez le nom du fichier avec l'extension .pdf
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Libérer l'URL de l'objet blob
    window.URL.revokeObjectURL(url);
  }

}
