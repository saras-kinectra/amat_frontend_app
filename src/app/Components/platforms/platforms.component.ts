
import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { StorageService } from './../../Services/storage.service';
import { ApiService } from './../../Services/api.service';

@Component({

  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PlatFormsComponent implements OnInit {

  public platformsList: any[];
  selectedPosition;
  public form: FormGroup;

  selectOPID: string = "";

  toolTipIcon: string = "assets/Icon-Info-Inactive@1x.png";

  @ViewChild('opIdInput') opIdInput: ElementRef<HTMLInputElement>;

  constructor(private apiService: ApiService, private storageService: StorageService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.form = this.formBuilder.group({

      platform: [null, [Validators.required]],
    });

    this.opIdInput.nativeElement.focus();

    this.apiService.getPlatforms().subscribe(response => {

      console.log("Response - getPlatforms: ", response);

      this.platformsList = JSON.parse(JSON.stringify(response));

      console.log("Response - getPlatforms: json: ", this.platformsList);
    });
  }

  onPlatFormListChange(event, index) {

    console.log("onPlatFormListChange", event._id, index);
  }

  onToolTipMouseOver(): void {

    this.toolTipIcon = "assets/info_icon@1x.png";
  }

  onToolTipMouseOut(): void {

    this.toolTipIcon = "assets/Icon-Info-Inactive@1x.png";
  }

  next() {

    console.log("next selectedPosition: ", this.selectedPosition);
    console.log("next opID: ", this.selectOPID);

    localStorage.setItem("SelectedPlatform", JSON.stringify(this.platformsList[this.selectedPosition]));
    localStorage.setItem("SelectedOPID", this.selectOPID);

    console.log("next selected platform: ", this.platformsList[this.selectedPosition]);

    this.router.navigate(['platform/chambers'], { relativeTo: this.route });
  }
}