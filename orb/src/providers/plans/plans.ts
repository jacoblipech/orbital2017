import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PlansProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PlansProvider {

  data: any;
 
  constructor(public http: Http) {
    this.data = null;
  }
 
  getPlan(id){
 
    
 
    
 
      return this.http.get('http://localhost:3000/plan/' + id)
        .map(res => res.json())
        
   
 
  }
 
  createPlan(plan, id){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post('http://localhost:3000/edit/' + id, JSON.stringify(plan), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }

}
