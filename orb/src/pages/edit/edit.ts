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
import { AuthProvider } from '../../providers/auth/auth';
import { TempPage } from '../temp/temp';

/**
 * Generated class for the EditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'edit',
  segment: 'edit/:id'
})

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})

export class EditPage { 

  //getting data about plan from home!

  plan: any = this.navParams.data;
  user: object;
  numbers: number[] = [0,1];
  tab1Root: any;
  plansID: string;
  counter: number = -3;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public modalCtrl: ModalController, 
  	public viewCtrl: ViewController, 
  	public planService: PlansProvider,
  	public popoverCtrl: PopoverController, 
    public authService: AuthProvider,
    public storage: Storage
  	) {
      // this.storage.set('data', this.navParams.data);
      // this.storage.get('data').then((data)=>{
      //   console.log(data);
      // });
      
  		// this.numbers = Array.apply(null, {
    //     length: this.plan.days
    //   }).map(Number.call, Number);

      this.storage.get('currUser').then(data => {
        // console.log(data);
        this.user = data; 
      });
      console.log(this.plan.days, this.plan.month, this.plan.country, this.navParams.data, this.user);
  		this.tab1Root = 'template';
	  }

  ionViewWillLoad() {
    //allows this.plan to retrieve data from storage upon being loaded
    // this.storage.get('data').then((data)=>{
    //     this.plan = data;
    // });
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
     
    // console.log(this.plan); plan is correctly passed from home.ts
    // console.log(this.user);
    
    //console.log(this.plansID);
    
  }

  next() {
   this.counter++;
   if (this.counter <= this.plan.days.length) {
     this.navCtrl.push('temp', this.plan);
   }
  }

  ngOnInit() {
    
  	//this.authService.getUser(this.navParams.get('id'));
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

  goToHome() {
    let opts = { animate: true, animation: "transition", direction: 'forward' ,duration: 1000}
    this.navCtrl.setRoot('welcome', true, opts);
    this.navCtrl.popToRoot();
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

}
