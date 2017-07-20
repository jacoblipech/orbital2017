import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ActivityProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ActivityProvider {

  data: any;

  constructor(public http: Http) {
  	this.data = null;
  }

  createActivity(activity){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post('http://localhost:3000/activity', JSON.stringify(activity), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }
 
  deleteActivity(id){
 
    this.http.delete('http://localhost:3000/activity/' + id).subscribe((res) => {
      console.log(res.json());
    });    
 
  }

}
