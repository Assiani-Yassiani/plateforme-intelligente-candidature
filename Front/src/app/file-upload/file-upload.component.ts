import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { FilesService } from '../_services/file-upload.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;
  userId: any;

  constructor(public tokenStorageService: TokenStorageService ,public uploadService: FilesService) { }

  ngOnInit(): void {
   
    //this.fileInfos = this.uploadService.getFile();
  
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;

  }

  upload(): void {
    console.log("hello");
    this.progress = 0;
    this.message = '';
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
          // Access file properties
             console.log(file!.name); // 'filename.txt'
              console.log(file!.size); // Size in bytes
              console.log(file!.type); // 'text/plain'
              console.log(file!.lastModified); // Timestamp
              // Read file contents
// file!.text().then((content) => {
//   console.log(content); // 'file content'
// });

      if (file) {
  
          const maxSizeInBytes = 500 * 1024 * 1024; // 500MB en octets
          if (file.size > maxSizeInBytes) {
            // La taille du fichier dépasse la limite
            this.message = "La taille du fichier dépasse la limite de 500MB";
            this.selectedFiles = undefined;
      
            return;
          }
          const allowedTypes = ['application/pdf'];
          if (!allowedTypes.includes(file.type)) {
            // Le type de fichier n'est pas un PDF
            this.message ="Le type de fichier sélectionné n'est pas un PDF";
            return;
          }
          this.currentFile = file;
          this.userId=this.tokenStorageService.getUser().id;

        this.uploadService.uploadFile(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              //this.fileInfos = this.uploadService.getFile();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }
}
