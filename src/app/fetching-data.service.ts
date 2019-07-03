import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchingDataService {

  constructor(private http: HttpClient) { }

  getData(key: string) {
    const trim  = key.split(' ');
    let url = trim[0];
    for ( let i = 1; i < trim.length; i += 1 ) {
      url = url + '+' + trim[i];
    }

    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + url).pipe(
      map((data: any) => data.items as Array<any>)
    );
  }
}
