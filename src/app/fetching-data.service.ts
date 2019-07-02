import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchingDataService {

  constructor(private http: HttpClient) { }

  getData(key) {
    console.log(key);
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + key);
  }
}
