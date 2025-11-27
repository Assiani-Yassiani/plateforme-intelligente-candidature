import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../_helpers/custom-validators';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidatDto } from "../model/CandidatDto";
import { ProfileService } from '../_services/candidat.service';
import { FilesService } from '../_services/file-upload.service';
import { PrimeNGConfig, SelectItem, SelectItemGroup } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';
import { TokenStorageService } from '../_services/token-storage.service';

import { ActivatedRoute, Route, Router } from '@angular/router';


declare var $: any;
interface multiSelect {
  name: string,
  code: number
}
@Component({
  selector: 'app-edit-profil-candidat',
  templateUrl: './edit-profil-candidat.component.html',
  styleUrls: ['./edit-profil-candidat.component.css']
})
export class EditProfilCandidatComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  selectedFile?: File | null;
  currentFile?: File | null;
  progress = 0;
  selectedValues: any = {};
  candidat!: CandidatDto;
  diplomes!: multiSelect[];
  langues!: multiSelect[];
  competences!: multiSelect[];
  error: string | null = null;
  status: string | null = null;
  message = '';
  fileInfos?: Observable<any>;
  groupedCompetences!: SelectItemGroup[];
  //selectedCompetences!: multiSelect[];
  offreId: any
  idcondidat: any
  constructor(private formBuilder: FormBuilder,
    public customValidators: CustomValidators,
    private uploadService: FilesService,
    private candidatService: ProfileService, private router: Router,
    private primengConfig: PrimeNGConfig, private http: HttpClient, private tokenStorage: TokenStorageService, private route: ActivatedRoute
  ) {



  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  convertListToString(list: string[]): string {
    let ch = "";
    for (let str of list) {
      ch += str + " ";
    }
    return ch.trim(); // trim() pour enlever l'espace final
  }
  ngOnInit(): void {
    console.log(this.tokenStorage.getidconduiat())

    this.idcondidat = this.tokenStorage.getidconduiat()
    console.log(this.idcondidat)
   



    this.diplomes = [
      { name: "Ingénierie", code: 1 },
      { name: "Master", code: 2 },
      { name: "licence", code: 3 }
    ];


    this.route.params.subscribe(params => {
      this.offreId = params['id'];

    });



    this.groupedCompetences = [
      {
        label: 'Développement logiciel',
        value: 'de',
        items: [
          { label: 'JavaScript', value: 'JavaScript' },
          { label: 'Java', value: 'Java' },
          { label: 'Python', value: 'Python' },
          { label: 'C++', value: 'C++' },
          { label: 'C#', value: 'C#' },
          { label: 'Ruby', value: 'Ruby' },
          { label: 'PHP', value: 'PHP' },
          { label: 'Kotlin', value: 'Kotlin' },
          { label: 'React', value: 'React' },
          { label: 'Angular', value: 'Angular' },
          { label: 'Vue.js', value: 'Vue.js' },
          { label: 'Django', value: 'Django' },
          { label: '.NET', value: '.NET' },
          { label: 'Spring', value: 'Spring' },
          { label: 'Unity', value: 'Unity' },

        ]
      },



      {
        label: 'Maintenance informatique',
        value: 'Maintenance informatique',
        items: [
          { label: 'Windows', value: 'Windows' },
          { label: 'macOS', value: 'macOS' },
          { label: 'Linux', value: 'Linux' },
          { label: 'Microsoft Office', value: 'Microsoft Office' },
          { label: 'Microsoft Office', value: 'Adobe Creative Cloud' },
          { label: 'Microsoft Office', value: 'Antivirus' },
          { label: 'Microsoft Office', value: 'Logiciels de sauvegarde' }
        ]
      },


      {
        label: 'Sécurité informatique',
        value: 'Sécurité informatique',
        items: [
          { label: 'Kali Linux', value: 'Kali Linux' },
          { label: 'Nmap', value: 'Nmap' },
          { label: 'Wireshark', value: 'Wireshark' },
          { label: 'Metasploit', value: 'Metasploit' },
          { label: 'Burp Suite', value: 'Burp Suite' },
          { label: 'Firewalls', value: 'Firewalls' },
          { label: 'Antivirus', value: 'Antivirus' },
          { label: 'Gestion des mots de passe', value: 'Gestion des mots de passe' }

        ]
      },



      {
        label: 'Administration de systèmes informatiques',
        value: 'Administration de systèmes informatiques',
        items: [
          { label: 'Windows Server', value: 'Windows Server' },
          { label: 'Linux', value: 'Linux' },
          { label: 'Active Directory', value: 'Active Directory' },
          { label: 'VMware', value: 'VMware' },
          { label: 'Hyper-V', value: 'Hyper-V' },
          { label: 'PowerShell', value: 'PowerShell' },
          { label: 'Bash', value: 'Bash' },
          { label: 'Ansible', value: 'Ansible' },
          { label: 'Nagios', value: 'Nagios' },
          { label: 'Zabbix', value: 'Zabbix' }
        ]
      },


      {
        label: 'Réseau informatique',
        value: 'Réseau informatique',
        items: [
          { label: 'Cisco', value: 'Cisco' },
          { label: 'Juniper', value: 'Juniper' },
          { label: 'Tokyo', value: 'Tokyo' },
          { label: 'Routeurs', value: 'Routeurs' },
          { label: 'Commutateurs', value: 'Commutateurs' },
          { label: 'Pare-feu', value: 'Pare-feu' },
          { label: 'VPN', value: 'VPN' },
          { label: 'Wi-Fi', value: 'Wi-Fi' },
          { label: 'Protocoles TCP/IP', value: 'Protocoles TCP/IP' },
          { label: 'DNS', value: 'DNS' },
          { label: 'DHCP', value: 'DHCP' }

        ]
      },

      {
        label: 'Big Data',
        value: 'Big Data',
        items: [
          { label: 'Hadoop', value: 'Hadoop' },
          { label: 'Spark', value: 'Spark' },
          { label: 'Kafka', value: 'Kafka' },
          { label: 'MongoDB', value: 'MongoDB' },
          { label: 'Cassandra', value: 'Cassandra' },
          { label: 'Elasticsearch', value: 'Elasticsearch' },
          { label: 'Kibana', value: 'Kibana' },
          { label: 'TensorFlow', value: 'TensorFlow' },
          { label: 'Pandas', value: 'Pandas' },
          { label: 'Matplotlib', value: 'Matplotlib' }

        ]
      },





      {
        label: 'Cloud computing',
        value: 'Cloud computing',
        items: [
          { label: 'AWS', value: 'AWS' },
          { label: 'Microsoft Azure', value: 'Microsoft Azure' },
          { label: 'Google Cloud Platform', value: 'Google Cloud Platform' },
          { label: 'Docker', value: 'Docker' },
          { label: 'Terraform', value: 'Terraform' },
          { label: 'Ansible', value: 'Ansible' },
          { label: 'Jenkins', value: 'Jenkins' },
          { label: 'GitLab', value: 'GitLab' },
          { label: 'GitHub', value: 'GitHub' }

        ]
      }

    ];


    this.primengConfig.ripple = true;
    this.form = this.formBuilder.group({

      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      region: ['', Validators.required],
      //tel: ['', Validators.required,CustomValidators.patternValidator(/^(\+216)?[2-9]\d{1,7}$/, {phone: true })], 
      tel: new FormControl<string | null>(null, Validators.required),
      civilite: ['', [Validators.required, CustomValidators.selectOptionValidator]],
      selectedLangues: new FormControl<multiSelect[] | null>([], Validators.required),
      selectedDiplomes: new FormControl<multiSelect[] | null>([], Validators.required),
      selectedCompetences: new FormControl<multiSelect[] | null>([], Validators.required),

      domaine: ['', [Validators.required, CustomValidators.selectOptionValidator]],

      //diplome: ['', [Validators.required,CustomValidators.selectOptionValidator]],
      expProf: ['', [Validators.required, CustomValidators.selectOptionValidator]],
      //competences: ['', [Validators.required,CustomValidators.selectOptionValidator]],

      //langue: ['', [Validators.required,CustomValidators.selectOptionValidator]],


    });
    //$('.sg-select2').val($('.sg-select2 option:eq(0)').val()).trigger('change');




  }

  get selectedDiplomes() {
    return this.form.get('selectedDiplomes')!.value;
  }

  get selectedCompetences() {
    return this.form.get('selectedCompetences')!.value;
  }

  get selectedLangues() {
    return this.form.get('selectedLangues')!.value;
  }
  changeCivilite(event: any) {
    let selectId = event.target.value
    this.form.controls['civilite'].setValue(selectId);
    console.log(selectId)
  }
  changeDomaine(event: any) {
    let selectId = event.target.value
    this.form.controls['domaine'].setValue(selectId);
    console.log(selectId)
  }
  changeExpProf(event: any) {
    let selectId = event.target.value
    this.form.controls['expProf'].setValue(selectId);
    console.log(selectId)
  }
  selectFile(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    if (this.selectedFile) {
      console.log(this.selectedFile); // Afficher les informations du fichier dans la console

      // Vérifiez la taille et le type du fichier
      const maxSizeInBytes = 500 * 1024 * 1024; // 500MB
      if (this.selectedFile.size > maxSizeInBytes) {
        this.message = "La taille du fichier dépasse la limite de 500MB";
        this.selectedFile = null;
        return;
      }

      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(this.selectedFile.type)) {
        this.message = "Le type de fichier sélectionné n'est pas un PDF";
        this.selectedFile = null;
        return;
      }
      this.currentFile = this.selectedFile

      // Lire le fichier en tant que Blob et afficher son texte

    }
  }

  convertDiplomasToString(diplomas: { name: string, code: number }[]): string {
    return diplomas.map(diploma => `${diploma.name}`).join(' ');
  }



  onSubmit(): void {
    this.isSubmitted = true;

    console.log(this.form.value);


    if (this.currentFile) {
      const cv = new FormData();
      cv.append('file', this.currentFile, this.currentFile.name);



      // this.candidat = {
      //   nom: this.form.value.nom,
      //   prenom: this.form.value.prenom,
      //   region: this.form.value.region,
      //   tel: this.form.value.tel,
      //   civilite: this.form.value.civilite,
      //   langues: this.form.value.langue,
      //   diplomes: this.form.value.selectedDiplomes,
      //   //this.form.get('selectedCompetences')?.value
      //   competences: this.form.value.selectedCompetences,
      //   domaine: this.form.value.domaine,
      //   experienceProf: this.form.value.expProf,
      //   cv: this.currentFile
      // };
      const diplomasString = this.convertDiplomasToString(this.selectedDiplomes);
  



      this.http.post<any>('http://localhost:8080/api/condidat/create?nom=' + this.form.value.nom + '&prenom=' + this.form.value.prenom + '&region=' + this.form.value.region + '&idc=' + this.tokenStorage.getUser().id + '&tel=' + this.form.value.tel + '&civilite=' + this.form.value.civilite + "&diplomes=" + diplomasString + '&domaine=' + this.form.value.domaine + '&experienceProf=' + this.form.value.expProf + '&competences=' + this.convertListToString(this.selectedCompetences) + '&id=' + this.tokenStorage.getidconduiat(), cv).subscribe({
        next: data => {
          console.log(data)
          console.log('candidat created successfully');
          this.router.navigate(["profilCandidat"])

        },
        error: err => {
          console.log('Failed to create candidat: ' + err);
          if (err.error) {
            this.message = err.error.message;
            this.error = err.error.error;
            this.status = err.error.status;
          } else {
            // Handle the case when err.error is null
            this.message = 'An error occurred during the request.';
            this.error = null;
            this.status = null;
          }
        }
      });
 


      this.selectedFile = undefined;
    }
  }

}
//setTimeout(() => {
 // this.router.navigate(['offresemploi']);
//}, 2500);