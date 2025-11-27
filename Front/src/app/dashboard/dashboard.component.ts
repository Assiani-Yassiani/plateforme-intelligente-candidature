import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';
import { ProfileService } from '../_services/candidat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private profileService: ProfileService) { }

  stat: any
  codidat: any

  ngOnInit(): void {
    this.dashboardService.getDashboardCounts().subscribe(data => {

      console.log(data)
      this.stat = data




    })



    this.profileService.getLatestCandidat().subscribe(data => {


      console.log(data)
      this.codidat = data
    })






  }

}
