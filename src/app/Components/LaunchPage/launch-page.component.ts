import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-launch-page',
  templateUrl: './launch-page.component.html',
  styleUrls: ['./launch-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LaunchPageComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    
  }

  userInfo() {

  }

  navigateToDashboard() {

    localStorage.clear();
    this.router.navigate(['/dashboard'], { relativeTo: this.route });
  }

  navigateToExplorer() {

    this.router.navigate(['/home'], { relativeTo: this.route });
  }
}