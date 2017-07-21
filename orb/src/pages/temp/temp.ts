import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, PopoverController } from 'ionic-angular';
import { PlansProvider } from '../../providers/plans/plans';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { InvitePage } from '../invite/invite';
import { HomePage } from '../home/home';
import { PopoverPage } from '../popover/popover';
import { TemplatePage } from '../template/template';
import { ActivityPage } from '../activity/activity';
import { AuthProvider } from '../../providers/auth/auth';
import { AlternativesPage } from '../alternatives/alternatives';
import { ActivityProvider } from '../../providers/activity/activity';
import { AlternativeModel } from '../../app/models/alternative-model';

@IonicPage({
	name: 'temp'
})
@Component({
  selector: 'page-temp',
  templateUrl: 'temp.html',
})
export class TempPage {
  plan: any = this.navParams.data;
  user: object;
  plansID: string;
  activities: any[] = [];
  comment: string = '';
  comments: any[] = [];
  counter: number = 1;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public modalCtrl: ModalController, 
  	public viewCtrl: ViewController, 
  	public planService: PlansProvider,
  	public popoverCtrl: PopoverController, 
    public authService: AuthProvider,
    public storage: Storage, public activityService: ActivityProvider) 

  {
  	this.storage.get('currUser').then(data => {
        // console.log(data);
        this.user = data; 
      });

  }



  ngOnInit() {
    
  	//this.authService.getUser(this.navParams.get('id'));
  }
  ionViewDidLoad() {
  	console.log("HELLLO")
    this.authService.getUser(this.navParams.get('id')).subscribe(data => {
        console.log(data.plans[data.plans.length-1]);
        this.plansID = data.plans[data.plans.length-1];
        console.log(this.plansID);
        this.planService.getPlan(this.plansID).subscribe(data => {
          
          this.plan = data
          console.log(this.plan);
          console.log(this.plan.days, this.plan.month, this.plan.country);
          

        });
      });
  }
  goToHome() {
    let opts = { animate: true, animation: "transition", direction: 'forward' ,duration: 1000}
    this.navCtrl.setRoot('welcome', true, opts);
    this.navCtrl.popToRoot();
  }
  next() {
   this.counter++;
   if (this.counter <= this.plan.days.length) {
     this.navCtrl.push('temp', this.plan);
   }
  }

  back() {
  	this.navCtrl.pop();
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

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  logout() {
    // console.log(this.user);
    this.authService.logout();
    this.user = null;
    this.navCtrl.setRoot('welcome', false);
    this.navCtrl.popToRoot();
    // console.log(this.user);
  }


  launchInvitePage() {
    let modal = this.modalCtrl.create(InvitePage);
    modal.present();
  }

  launchLoginPage() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(data => {
        
        if (data) {
          this.user = data;
          //this.logged = true;
          this.storage.set('currUser', data);
        } else {
          //this.logged = false;
        }
    });
    modal.present();
  }

  launchSignupPage() {
    let modal = this.modalCtrl.create(SignupPage);
    modal.onDidDismiss(data => {
        
        if (data) {
          this.user = data;
          //this.logged = true;
          this.storage.set('currUser', data);
        } else {
          //this.logged = false;
        }
        // console.log(data);
    });
    modal.present();
  }

}
