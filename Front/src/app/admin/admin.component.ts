import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  showModal = false;
  selectedCardId: number | null = null;
  users: any
  userId: any;

  constructor(private http: HttpClient) {

    this.get_user()

  }
  get_user() {
    this.http.get('http://localhost:8080/api/allusers').subscribe((data) => {
      console.log(data)

      this.users = data
    });
  }
  logout() {
    localStorage.clear();
  }
  deleteUser(email: any) {
    this.http.delete('http://localhost:8080/api/delete_user/' + email).subscribe((data) => {



    });
    this.get_user()


  }
  block(email: any) {

    this.http.delete('http://localhost:8080/api/blocked/' + email).subscribe((data) => {



    });
    this.get_user()




  }
  unblock(email: any) {
    console.log(email)
    this.http.delete('http://localhost:8080/api/unblocked/' + email).subscribe((data) => {



    });
    this.get_user()



  }
  changeRole(email: any, role: any) {
    console.log(email)
    if (role == "candidat")
      role = "recruteur"
    else if (role == "recruteur") {
      role = "candidat"
    }

    this.http.get('http://localhost:8080/api/role/' + email + "/" + role).subscribe((data) => {



    });

    this.get_user()
  }
  toggleModal(userId: number) {
    this.userId = userId;

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.userId = null;
    this.get_user()
  }
  deleteItem(): void {


    this.deleteUser(this.userId);
    this.get_user()
    this.closeModal();
  }
}

