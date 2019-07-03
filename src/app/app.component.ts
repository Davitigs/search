import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FetchingDataService} from './fetching-data.service';
import {debounceTime, distinctUntilChanged, filter, map, mergeMap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'dav-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private fetchingService: FetchingDataService) {}

  keys = '';
  // searchForm = new FormGroup({
  //   searchKeyword: new FormControl('')
  // });
  error: any;
  datum: any;

  searchControl = new FormControl('');

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(350),
        distinctUntilChanged(), // filter
        map((query: string) => query.toLowerCase()),
        filter(q => !!q),
        switchMap((query: string) => this.fetchingService.getData(query))
      )
      .subscribe(items => {
        this.datum = items.filter(dat => dat.volumeInfo.title !== 'undefined');
      });
  }

  showData(key) {
    this.fetchingService.getData(key)
      .subscribe((data: any) => {
        // console.log(data.items);
        this.datum = data.items.filter(dat => dat.volumeInfo.title !== 'undefined');
        console.log(this.datum);
      }, error => {
        this.error = error;
      } );

  }

}
