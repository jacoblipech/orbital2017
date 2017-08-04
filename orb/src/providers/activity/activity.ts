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

  getActivity(id){ 
      return this.http.get('http://localhost:3000/activity/' + id).map(res => res.json()); 
  }

  getComment(id){ 
      return this.http.get('http://localhost:3000/comment/' + id).map(res => res.json()); 
  }

  createActivity(activity, id){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post('http://localhost:3000/activity/' + id, JSON.stringify(activity), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }
 
  deleteActivity(id){
 
    this.http.delete('http://localhost:3000/activity/' + id).subscribe((res) => {
      console.log(res.json());
    });    
 
  }

  editActivity(id){
 
    this.http.get('http://localhost:3000/activity/' + id).subscribe((res) => {
      console.log(res.json());
    });    
 
  }

  createAndAddComment(comment, id){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post('http://localhost:3000/activity/' + id + '/addcomment', JSON.stringify(comment), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }

  deleteComment(id, activity_id){
 
    this.http.delete('http://localhost:3000/comment/' + id + '/' + activity_id).subscribe((res) => {
      console.log(res.json());
    });    
 
  }

  addLikes(id, likes) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post('http://localhost:3000/activity/' + id + '/addlikes', JSON.stringify(likes), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
  }

  getAlternative(id) {
    return this.http.get('http://localhost:3000/alternative/' + id).map(res => res.json()); 
  }

  addAlternative(activity, activity_id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post('http://localhost:3000/alternative/' + activity_id, JSON.stringify(activity), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
  }

  addUser(email, planID) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     // send post request with email and plans id as parameters
    this.http.post('http://localhost:3000/addUser/' + planID + '/' + email, {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
  }

}
