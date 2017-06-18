import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { ActivityPage } from '../activity/activity';
import { ActivityProvider } from '../../providers/activity/activity';

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
  day: number = this.navParams.data;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController, public activityService: ActivityProvider) {
 
  }

  ionViewDidLoad() {
    console.log(this.navParams.data);
  }

  launchActivityPage() {

  	let modal = this.modalCtrl.create(ActivityPage);

  	modal.onDidDismiss(activity => {
      if(activity){
        this.activities.push(activity);
        this.activityService.createActivity(activity);        
      }
    });

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
