import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { ActivityPage } from '../activity/activity';
import { AlternativesPage } from '../alternatives/alternatives';
import { ActivityProvider } from '../../providers/activity/activity';
import { AlternativeModel } from '../../app/models/alternative-model';

/**
 * Generated class for the TemplatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'template'
})
@Component({
  selector: 'page-template',
  templateUrl: 'template.html',
})
export class TemplatePage {

  activities: any[] = [];
  comment: string = '';
  comments: any[] = [];
  day: number = this.navParams.data;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController, public activityService: ActivityProvider) {
 
  }

  ionViewDidLoad() {
    console.log(this.navParams.data);
  }

  delete(chip) {
    let index = this.comments.indexOf(chip);
 
      if(index > -1){
        this.comments.splice(index, 1);
      }
  }

  addComment(formValue) {

    this.comments.push(formValue.comment)
    this.comment = ''
  }

  launchActivityPage() {

  	let modal = this.modalCtrl.create(ActivityPage);

  	modal.onDidDismiss(activity => {
      if(activity){
        //console.log(activity)
        let currActivity = new AlternativeModel(activity, [], 0);
        this.activities.push(currActivity);
        //console.log(currActivity);
        //console.log(this.activities);
        this.activityService.createActivity(activity);        
      }
    });

  	modal.present();
  }

  launchAnotherPage(index) {

    let modal = this.modalCtrl.create(ActivityPage);

    modal.onDidDismiss(activity => {
      if(activity){
        this.activities[index].addItem(activity);
        console.log(this.activities[index]);
        this.activityService.createActivity(activity);      
      }
    });

    modal.present();
  }

  launchAlternativesPage(index) {

    let modal = this.modalCtrl.create(AlternativesPage, this.activities[index]);

    modal.present();
  }

  deleteActivity(activity){
 
    //Remove locally
      let index = this.activities.indexOf(activity);
 
      if(index > -1){
        this.activities.splice(index, 1);
      }   
 
    //Remove from database
    this.activityService.deleteActivity(activity._id);
  }

}
