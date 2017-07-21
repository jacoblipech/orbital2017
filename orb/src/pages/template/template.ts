import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, PopoverController } from 'ionic-angular';
import { PlansProvider } from '../../providers/plans/plans';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { InvitePage } from '../invite/invite';
import { HomePage } from '../home/home';
import { PopoverPage } from '../popover/popover';
import { ActivityPage } from '../activity/activity';
import { AuthProvider } from '../../providers/auth/auth';
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
  plan: any = this.navParams.data;
  user: object;
  plansID: string;
  activities: any[] = [];
  comment: string = '';
  comments: any[] = [];
  day: number = this.navParams.data;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, 
    public viewCtrl: ViewController, public activityService: ActivityProvider,
    public storage: Storage,public planService: PlansProvider,
    public authService: AuthProvider) {
    this.storage.get('currUser').then(data => {
        // console.log(data);
        this.user = data; 
      });
  }

  ionViewDidLoad() {
    console.log(this.navParams.data);
    this.authService.getUser(this.navParams.get('id')).subscribe(data => {
        console.log(data.plans[data.plans.length-1]);
        this.plansID = data.plans[data.plans.length-1];
        console.log(this.plansID);
        this.planService.getPlan(this.plansID).subscribe(data => {
          
          this.plan = data
          this.activities = data.activities;
          console.log(this.plan);
          console.log(this.plan.days, this.plan.month, this.plan.country);
          

        });
        // this.activityService.getActivity(this.plansID).subscribe(data => {
        //   this.activities = data;
        // });
      });
  }

  delete(chip, index) {
    this.activities[index].deleteComment(chip);
  }

  addComment(formValue, index) {

    this.activities[index].addComment(formValue);
    this.comment = ''
  }

  launchActivityPage() {

  	let modal = this.modalCtrl.create(ActivityPage);

  	modal.onDidDismiss(activity => {
      if(activity){
        //console.log(activity)
        let currActivity = new AlternativeModel(activity, [], 0, []);
        this.activities.push(currActivity);
        //console.log(currActivity);
        //console.log(this.activities);
        this.activityService.createActivity(activity, this.plansID);        
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
        this.activityService.createActivity(activity, this.plansID);      
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
