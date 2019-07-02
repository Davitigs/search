import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FetchingDataService} from './fetching-data.service';
import {Config} from 'protractor';

@Component({
  selector: 'dav-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private fetchingService: FetchingDataService) {}


  keys = '';
  // searchForm = new FormGroup({
  //   searchKeyword: new FormControl('')
  // });
  error: any;
  datum: any;

  showData() {
    this.fetchingService.getData(this.keys)
      .subscribe((data: Response) => {
        // console.log(data);
        this.datum = data;
      }, error => {
        this.error = error;
        console.log(error);
      } );
  }
}
